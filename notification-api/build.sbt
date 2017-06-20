lazy val akkaHttpVersion = "10.0.7"
lazy val akkaVersion    = "2.5.2"

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization    := "com.example",
      scalaVersion    := "2.12.2"
    )),
    name := "notification-api",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http"         % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-xml"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-stream"       % akkaVersion,
      "de.heikoseeberger" %% "akka-http-circe" % "1.16.1",
"com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion % Test,
      "org.scalatest"     %% "scalatest"         % "3.0.1"         % Test
    )
  )
