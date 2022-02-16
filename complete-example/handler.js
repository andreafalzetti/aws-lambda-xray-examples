const http = require("http");
const https = require("https");
const AWSXRay = require("aws-xray-sdk-core");
const got = require("got");

const runWithXray = () => {};

module.exports.hello = async (event) => {
  AWSXRay.captureHTTPsGlobal(http);
  AWSXRay.captureHTTPsGlobal(https);
  AWSXRay.capturePromise();

  var user = "john123";

  AWSXRay.getSegment().setUser(user);

  let data;
  try {
    const response = await got(" https://dog.ceo/api/breeds/image/random");
    data = response.body;
  } catch (error) {
    console.log(error.response.body);
    throw error;
  }

  // AWSXRay.captureFunc("1", function (subsegment1) {
  //   //Exposing the subsegment in the function is optional, and is listed here as an example
  //   //You can also use:
  //   var subsegment1 = AWSXRay.getSegment();

  //   AWSXRay.captureFunc("2", function (subsegment2) {
  //     AWSXRay.captureFunc("3", function (subsegment3) {
  //       AWSXRay.captureFunc("4", function (subsegment4) {
  //         AWSXRay.captureFunc("5", function () {
  //           //exposing the subsegment is optional
  //           return {
  //             statusCode: 200,
  //             body: JSON.stringify(data, null, 2),
  //           };
  //         });
  //       });
  //     });
  //   });
  // });
};
