import 'package:dio/dio.dart';

class ApiConfiguration {
  static String appDomainUrl = 'https://0205-129-0-80-177.ngrok-free.app/';

  static Dio dioClient = Dio(
    BaseOptions(
      baseUrl: '${appDomainUrl}api/',
      headers: {'Content-Type': 'application/json'},
    ),
  );

  static Options getAuthorizationOptions(String authToken) => Options(
        headers: {
          'Authorization': 'Bearer $authToken',
        },
      );

  // this function is use to retrieve dio error message as a string
  static String getErrorMessage(DioException error) {
    late String errorMessage;

    if (error.response!.statusCode != 404) {
      final errorContent = error.response!.data;
      errorMessage = errorContent['message'];
    } else {
      errorMessage =
          'Quelque chose s\'est mal passé, veuillez réesayer plus tard...';
    }

    return errorMessage;
  }
}
