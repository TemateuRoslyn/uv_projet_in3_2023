import 'dart:async';

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

  late String _userId;
  late String _userToken;

  String get getUserId => _userId;
  String get getUserToken => _userToken;

  Stream<AuthStatus> getStatus() async* {
    final userToken = await flutterSecureStorage.read(key: kUserToken);

    // time to display slapsh page
    await Future.delayed(const Duration(seconds: 4));

    if (userToken != null && userToken != '') {
      _userId = (await flutterSecureStorage.read(key: kUserId))!;
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

  Future<void> login() async {
    try {} catch (e) {
      rethrow;
    }
  }

  void logOut() async {
    _authStatusController.add(AuthStatus.unAuthenticated);
  }

  void dispose() => _authStatusController.close();
}
