import 'dart:io';

import 'package:fltter_app/common/services/pusher_service.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  static Future<void> initNotification({
    required void Function(NotificationResponse)? onNotificationClick,
  }) async {
    AndroidInitializationSettings initializationSettingsAndroid =
        const AndroidInitializationSettings('logo');

    var initializationSettingsIOS = DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
        onDidReceiveLocalNotification:
            (int id, String? title, String? body, String? payload) async {});

    var initializationSettings = InitializationSettings(
        android: initializationSettingsAndroid, iOS: initializationSettingsIOS);
    await notificationsPlugin.initialize(
      initializationSettings,
      // onDidReceiveBackgroundNotificationResponse: onBackGroundNotificationClick,
      onDidReceiveNotificationResponse: onNotificationClick,
    );

    await _requestPersmissions();
    PusherService.initPusher();
  }

  static Future<void> _requestPersmissions() async {
    if (Platform.isIOS) {
      await notificationsPlugin
          .resolvePlatformSpecificImplementation<
              IOSFlutterLocalNotificationsPlugin>()
          ?.requestPermissions(
            alert: false,
            badge: true,
            sound: true,
          );
    }

    if (Platform.isAndroid) {
      final isNotificationsPermissionGranted =
          await Permission.notification.isGranted;
      if (!isNotificationsPermissionGranted) {
        await Permission.notification.request();
      }
    }
  }

  static notificationDetails() {
    return const NotificationDetails(
        android: AndroidNotificationDetails(
          'channelId',
          'channelName',
          importance: Importance.max,
          priority: Priority.high,
        ),
        iOS: DarwinNotificationDetails(presentSound: true));
  }

  static Future showNotification(
      {int id = 0, String? title, String? body, String? payLoad}) async {
    return notificationsPlugin
        .show(id, title, body, await notificationDetails(), payload: payLoad);
  }
}
