import 'dart:async';
import 'dart:developer';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../common/configurations/api_configuration.dart';
import '../common/utils/constants.dart';

enum AuthStatus {
  authenticated,
  unAuthenticated,
  unknown,
}

class AuthRepository {
  final _authStatusController = StreamController<AuthStatus>();

  final dio = ApiConfiguration.dioClient;
  final flutterSecureStorage = const FlutterSecureStorage();

  late int _userId;
  late String _userToken;

  int get getUserId => _userId;
  String get getUserToken => _userToken;

  Stream<AuthStatus> getStatus() async* {
    final userToken = await flutterSecureStorage.read(key: kUserToken);

    // time to display slapsh page
    await Future.delayed(const Duration(seconds: 4));

    if (userToken != null && userToken != '') {
      _userId = int.parse((await flutterSecureStorage.read(key: kUserId))!);
      _userToken = userToken;
      yield AuthStatus.authenticated;
    } else {
      yield AuthStatus.unAuthenticated;
    }

    yield* _authStatusController.stream;
  }

  Future<bool> checkUserFirstUsage() async {
    final firstUsage = await flutterSecureStorage.read(key: kIsFirstUsage);

    if (firstUsage == null) {
      return true;
    } else {
      return false;
    }
  }

  void changeFirstUsageValue() async {
    await flutterSecureStorage.write(
        key: kIsFirstUsage, value: 'is-not-first-usage');
  }

  void saveUserIdInLocalStorage(int userId) async {
    await flutterSecureStorage.write(key: kUserId, value: userId.toString());
    _userId = userId;
  }

  void saveUserTokenInLocalStorage(String userToken) async {
    await flutterSecureStorage.write(key: kUserToken, value: userToken);
    _userToken = userToken;
  }

  Future<void> login(String userName, String password) async {
    try {
      final response = await dio.post('auth/login', data: {
        "username": userName,
        "password": password,
        "persistent": "true"
      });

      final userId = response.data['content']['user']['id'];
      final token = response.data['content']['token'];

      saveUserIdInLocalStorage(userId);
      saveUserTokenInLocalStorage(token);
    } catch (e) {
      rethrow;
    }
  }

  void logOut() async {
    _authStatusController.add(AuthStatus.unAuthenticated);
  }

  void dispose() => _authStatusController.close();
}
