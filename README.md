# Digital Citizenship

Docs (Italian): https://teamdigitale.github.io/digital-citizenship/

## Documentation

`npm run docs:build` to build sphinx documentation

`npm run docs:publish` to deploy docs to gh-pages

## Contributing

### Architecture decisions

We use [ADR](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)s to track architectural decisions of this initiative.

This repository is configured for Nat Pryce's [_adr-tools_](https://github.com/npryce/adr-tools).

### API definitions

API definitions are in OAS (Swagger 2.0).

## Configuring the Azure infrastructure

This repository contains scripts to deploy needed PaaS on Azure cloud.

### Prerequisites

An active [Azure subscription](https://azure.microsoft.com/en-us/free).

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/it/) >= 0.6.x
- [Terraform](https://terraform.io) >= 0.10.x
- [Yarn](https://yarnpkg.com) >= 1.0.x

All binaries must be in the system path.

### Set up an Azure Active Directory B2C tenant

#### Step 1 - Add an Azure Active Directory B2C resource

To authenticate Digital Citizenship API users (through the developer portal) we use an [Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-overview) (ADB2C) tenant.

The ADB2C tenant *must* exists *before* running any of the task illustrated below.
Alas, it's actually not possible to create (and manage) it programmatically:

https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-get-started

The tenant name must coincide with the `azurerm_adb2c_tenant` setting
in the `tfvars.json` file relative to the target deploy environment
(ie. [production](./infrastructure/env/production/tfvars.json) or 
[development](./infrastructure/env/development/tfvars.json)).

#### Step 2 - Add users attributes in ADB2C

During user sign-in to the Digital Citizenship API
we collect some custom attributes relative to the user account.

Go to the ADB2C blade in the Azure portal -> "User attributes"
and add the following custom attributes (type is always "String"):

1. Organization
1. Department
1. Service

#### Step 3 - Add and configure an ADB2C Sign-in / Sing-up policy

To be able to sign-in and sign-up users through ADB2C you need
to [create a Sign-in / Sign-up Policy](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-policies).

Go the Azure ADB2C blade in the Azure portal 
-> "Sign-up or Sign-in policies" -> "Add".

Policy Name:
  - SignUpIn

Identity Providers:
  - Email signup

Sign-up attributes:
  - Department
  - Display Name
  - Given Name
  - Organization
  - Service
  - Surname

Application claims: 
  - Department
  - Display Name
  - Given Name
  - Organization
  - Service
  - Surname
  - Email Addresses
  - Identity Provider
  - User is new
  - User's Object ID

Multifactor authentication
- On

Page UI customization
- Set up for every page the following custom page URI:

  https://teamdigitale.github.io/digital-citizenship-onboarding/unified.html
- Save the policy
- Customize the "Multifactor authentication page"
- Open "Local account sign-up page"
  - Mark all fields as required (optional = no)
  - Reorder fields and rename labels at wish

#### Step 4 - Add 2 Applications in the Azure ADB2C tenant

Finally, you need to register (create) two ADB2C Applications:
https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-app-registration

1. Register an ADB2C Application `dev-portal-app`

Set the return URL of this application to:  
https://`${config.azurerm_apim}`.portal.azure-api.net/signin-aad

(replace `${config.azurerm_apim}` with the actual value in your tfvars.json file)

Generate a key, then set the two environment variables:

```
export DEV_PORTAL_CLIENT_ID=<Application Id>
export DEV_PORTAL_CLIENT_SECRET=<Application Key>
```

1. Register an ADB2C Application `dev-portal-ext`

Set the return URL of this application to:  
https://`${config.azurerm_app_service_portal}`.azurewebsites.net/auth/openid/return

(replace `${config.azurerm_app_service_portal}` with the actual value in your tfvars.json file)

Generate a key, then set the two environment variables:

```
export DEV_PORTAL_EXT_CLIENT_ID=<Application Id>
export DEV_PORTAL_EXT_CLIENT_SECRET=<Application Key>
```

### Deploy instructions

1. Create an [Active Directory Principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-application-objects)
and get `CLIENT_ID`, `CLIENT_SECRET`, `TENANT_ID` (the Active Directory Id) and Azure `SUBSCRIPTION_ID`.

Set up the following environment variables to let Terrform and tasks authenticate against the Azure subscription:

```
export ARM_SUBSCRIPTION_ID=<subscription Id>
export ARM_CLIENT_ID=<service principal client (app) Id>
export ARM_CLIENT_SECRET=<service principal client secret (key)>
export ARM_TENANT_ID=<Active Directory domain Id>
```

1. Set the `ENVIRONMENT` variable value; can be any between `production` or `development`: 

```
set ENVIRONMENT=production
```

1. Edit configuration file for the choosen environment `infrastructure/$ENVIRONMENT/tfvars.json`

1. Run the following commands:

```
yarn install
yarn resources:deploy
```

Running the command will deploy the following services to an Azure resource group:

- [App service plan](https://azure.microsoft.com/en-us/pricing/details/app-service/plans/)
- [Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) app (configured)
- [CosmosDB database](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) (and collections)
- [Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction)
- [Storage queues](https://azure.microsoft.com/en-us/services/storage/queues/) (for emails and messages)
- [Blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- [API management](https://docs.microsoft.com/en-us/azure/api-management/api-management-key-concepts) (with configuration)
- [Application insights](https://azure.microsoft.com/it-it/services/application-insights/)
- [Log analytics](https://azure.microsoft.com/en-au/services/log-analytics/)
- [EventHub](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-what-is-event-hubs)
- [Web App service](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-overview)

Most services get provisioned by Terraform (see `infrastructure/azure.tf`).

Some services aren't yet supported by Terraform (CosmosDB database and collections, [Functions](https://github.com/terraform-providers/terraform-provider-azurerm/issues/131), 
[API management](https://docs.microsoft.com/en-us/azure/api-management/));
these ones are created by NodeJS scripts (`infrastructure/tasks`) that provision the services through the
[Azure Resource Manager APIs](https://github.com/Azure/azure-sdk-for-node).

### Finishing the installation

Some tasks cannot be carried out programmatically and require a manual intervention 
by the Azure subscription administrator through the Azure portal interface.

#### Activate "Managed Service Identity" for the onboarding Web App Service

To ease the onboarding of new developers (API users) we use a dedicated
[Application](https://github.com/teamdigitale/digital-citizenship-onboarding)
that starts some automated tasks once the user sign-in into the developer portal.

This web application exposes an HTTP endpoint that triggers some actions
on the authenticated user's account (ie. create a subscription to use the Digital Citizenship API).
These actions are triggered when the logged-in user clicks on a call-to-action button
that redirects her browser to the exposed endpoint.

To give the needed permissions (manage API management users account) to the onboarding Web App 
we use [Managed Service Identity](https://docs.microsoft.com/en-us/azure/active-directory/msi-overview).
In this way we can manage developer portal users directly from the Web application
without hardcoding any client credential into the App Service settings.

To activate Managed Service Identity and assign the needed role to the App Service:

1. Navigate to the Azure Portal App Service blade (for the Web App Service ${config.azurerm_app_service_portal})
 -> Managed Service Identity -> Register with Azure Active Directory -> set the value to 'On'.

1. Navigate to the Azure Portal API management blade -> Access Control (IAM) 
-> Add the registered Web application as a "Contributor".

1. Restart the Web App Service.

## Shared Terraform state

The Terraform state is shared through an Azure
[storage container](https://www.terraform.io/docs/state/remote.html).

Before running any command involving Terraform you must request access
to the Azure container to the project administrators (or use your own
for testing purposes when deploying to a staging resource group).

## Example environment configuration

Make sure you have all the following environment variables
set up before launching any npm task to provision Azure resources.

```bash
# May be development or production
export ENVIRONMENT="development"

# Azure service principal credentials (main AD tenant)
export ARM_SUBSCRIPTION_ID="XXXXX-XXXX-XXXX-XXXX-dXXXXXXXXX"
export ARM_CLIENT_ID="XXXXXXX-XXXX-XXXX-XXX-XXXXXXXXX"
export ARM_CLIENT_SECRET="XXXXXXXXXXXXXXXXXXXXXXXXXXXX="
export ARM_TENANT_ID="XXXXXXX-XXXXX-XXXX-XXXX-XXXXXXXXXXX"

# Client credentials for dev-portal-app ADB2C App
export DEV_PORTAL_CLIENT_ID="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
export DEV_PORTAL_CLIENT_SECRET="XXXXXXXXXXXXXXXXXXXXXXXX"

# Client credentials for dev-portal-ext ADB2C App
export DEV_PORTAL_EXT_CLIENT_ID="XXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
export DEV_PORTAL_EXT_CLIENT_SECRET="XXXXXXXXXXXXXXXXXXXXXXXX"

# Mail service API key
export SENDGRID_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

## Example output

```
$ yarn resources:deploy

> digital-citizenship@0.1.0 resources:deploy ...digital-citizenship
> npm-run-all resources:tf-init resources:tf-apply resources:cosmosdb resources:functions resources:api

> digital-citizenship@0.1.0 resources:tf-init ...digital-citizenship
> terraform init -var-file=infrastructure/tfvars.json infrastructure

Initializing provider plugins...

...

Terraform has been successfully initialized!

...

> digital-citizenship@0.1.0 resources:tf-apply ...digital-citizenship
> terraform apply -var-file=infrastructure/tfvars.json infrastructure

...

Apply complete! Resources: 9 added, 0 changed, 0 destroyed.

> digital-citizenship@0.1.0 resources:cosmosdb ...digital-citizenship
> ts-node infrastructure/tasks/00-cosmosdb.ts

successfully deployed cosmsodb database and collections

> digital-citizenship@0.1.0 resources:functions ...digital-citizenship
> ts-node infrastructure/tasks/10-functions.ts

...

```

## Deploy

When you are ready to deploy a new release, you need to synch 
the source code in the Git repository to the App Service (or to Azure Functions).

You may opt to configure continuos deployment from a GitHub branch,
automatically triggering a new deploy through a webhook when the changes are pushed.
To do that you must give your Azure subscription access to your
GitHub account in order to set up the webhook:

(https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment

We chose to not setup this kind of continous deployment, but
to provide scripts that, when launched from the command line, 
will synch the code from the GitHub repository to Azure services.

To deploy new code to the developer portal web application run:
```
yarn devapp:sync
```

To deploy new code to Azure Functions run:
```
yarn functions:sync
```
