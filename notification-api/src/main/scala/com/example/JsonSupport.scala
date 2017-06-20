package com.example

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json.DefaultJsonProtocol

/**
 * Created by gunzip on 20/06/17.
 */
trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {

  implicit val notificationFormat = jsonFormat4(Notification)
}
