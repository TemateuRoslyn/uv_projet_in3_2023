import 'dart:async';
import 'package:fltter_app/common/models/user.dart';
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

  static late int _userId;
  // late int _userIdBasedOnType;
  static late String _userToken;
  static late String _userType;

  static int get getUserId => _userId;
  // int get getUserIdBasedOnType => _userIdBasedOnType;
  static String get getUserToken => _userToken;
  static String get getUserType => _userType;

  Stream<AuthStatus> getStatus() async* {
    final userToken = await flutterSecureStorage.read(key: kUserToken);

    // time to display slapsh page
    await Future.delayed(const Duration(seconds: 4));

    if (userToken != null && userToken != '') {
      _userId = int.parse((await flutterSecureStorage.read(key: kUserId))!);
      // _userIdBasedOnType = int.parse(
      //     (await flutterSecureStorage.read(key: kUserIdBasedOnType))!);
      _userType = (await flutterSecureStorage.read(key: kUserType))!;
      // _userType = 'parents';
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

  Future<void> saveUserIdInLocalStorage(int userId) async {
    await flutterSecureStorage.write(key: kUserId, value: userId.toString());
    _userId = userId;
  }

  // void saveUserIdBasedOnTypeInLocalStorage(int userIdBasedOnType) async {
  //   await flutterSecureStorage.write(
  //       key: kUserId, value: userIdBasedOnType.toString());
  //   _userIdBasedOnType = userIdBasedOnType;
  // }

  Future<void> saveUserTokenInLocalStorage(String userToken) async {
    await flutterSecureStorage.write(key: kUserToken, value: userToken);
    _userToken = userToken;
  }

  Future<void> saveUserTypeInLocalStorage(String userType) async {
    await flutterSecureStorage.write(key: kUserType, value: userType);
    _userType = userType;
  }

  String getCurrentUserType(int userType) {
    switch (userType) {
      case 1:
        return 'users';
      case 2:
        return 'eleves';
      case 3:
        return 'parents';
      case 4:
        return 'professeurs';
      case 5:
        return 'personnels';
      case 6:
        return 'admin';
      default:
        return 'users';
    }
  }

  Future<void> login(String userName, String password) async {
    try {
      final response = await dio.post('auth/login', data: {
        "username": userName,
        "password": password,
        "persistent": "web"
      });

      final userId = response.data['content']['user']['model']['id'];
      // final userIdBasedOnType =
      //     (response.data['content']['user']['roles'] as List)[0]['id'];
      final token = response.data['content']['token'];
      final userType =
          (response.data['content']['user']['roles'] as List)[0]['id'];

      await saveUserIdInLocalStorage(userId);
      await saveUserTokenInLocalStorage(token);
      await saveUserTypeInLocalStorage(getCurrentUserType(userType));
      // saveUserIdBasedOnTypeInLocalStorage(userIdBasedOnType);
    } catch (e) {
      rethrow;
    }
  }

  Future<User> getCurrentUser() async {
    try {
      final response = await dio.get(
        '$_userType/findOne/$_userId',
        options: ApiConfiguration.getAuthorizationOptions(_userToken),
      );
      final userFound = User.fromJson(response.data!['content']);
      return userFound;
    } catch (e) {
      rethrow;
    }
  }

  Future<String> getChildrenInfosForVoice(int childId) async {
    try {
      final response = await dio.get(
        'fautes/findAll/eleve/voice/$childId',
        options: ApiConfiguration.getAuthorizationOptions(_userToken),
      );

      final voiceText = response.data['content']['message'];
      return voiceText;
    } catch (e) {
      rethrow;
    }
  }

  Future<String> getUserImage(String imagePath) async {
    try {
      final response = await dio.get(
        'files/download/$imagePath',
        options: ApiConfiguration.getAuthorizationOptions(_userToken),
      );

      final voiceText = response.data['content']['message'];
      return voiceText;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logOut() async {
    await flutterSecureStorage.delete(key: kUserId);
    await flutterSecureStorage.delete(key: kUserToken);
    await flutterSecureStorage.delete(key: kUserType);

    _authStatusController.add(AuthStatus.unAuthenticated);
  }

  void dispose() => _authStatusController.close();
}
