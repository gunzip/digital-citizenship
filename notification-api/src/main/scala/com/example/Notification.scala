package com.example

/**
 * Created by gunzip on 20/06/17.
 */
case class Notification(
  fiscalCode: String,
  content: String,
  sender: String,
  channel: Option[String]
)
