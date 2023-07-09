import 'package:dio/dio.dart';

class ApiConfiguration {
  static String appDomainUrl = 'https://e604-41-202-207-148.ngrok-free.app/';

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

    if (error.response == null) {
      errorMessage =
          'Veuillez verifier le debit de votre connection internet...';
    } else if (error.response!.statusCode != 404) {
      final errorContent = error.response!.data;
      if (errorContent.runtimeType == String) {
        errorMessage =
            'Quelque chose s\'est mal passé, veuillez réesayer plus tard...';
      } else {
        errorMessage = errorContent['message'];
      }
    } else {
      errorMessage =
          'Quelque chose s\'est mal passé, veuillez réesayer plus tard...';
    }

    return errorMessage;
  }
}
