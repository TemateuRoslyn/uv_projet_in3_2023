import 'package:dio/dio.dart';

class ApiConfiguration {
  static String appDomainUrl =
      'https://a963-129-0-103-69.ngrok-free.app/vendor/';

  static Dio dioClient = Dio(
    BaseOptions(
      baseUrl: '${appDomainUrl}api/v1/',
      headers: {'Content-Type': 'application/json'},
    ),
  );

  static Options getAuthorizationOptions(String authToken) => Options(
        headers: {
          'Authorization': 'Bearer $authToken',
        },
      );

  // this function is use to retrieve dio error message as a string
  static String getErrorMessage(DioError error) {
    late String errorMessage;

    if (error.response!.statusCode != 200 ||
        error.response!.statusCode != 201) {
      final errorContent = error.response!.data;
      errorMessage = errorContent['message'];
    } else {
      errorMessage = 'Something went wrong, please try back later...';
    }

    return errorMessage;
  }
}
