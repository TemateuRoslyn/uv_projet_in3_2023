import 'dart:developer';
import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:fltter_app/common/services/notification.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketIO {
  static final IO.Socket _socket = IO.io(ApiConfiguration.appDomainUrl,
      IO.OptionBuilder().setTransports(['websocket']).build());

  static void initSocketIO() {
    _socket.onConnect((data) => log('Socket connection succesfull...'));
    _socket.onConnectError((data) => log('Socket connection error...'));
    _socket.onDisconnect((data) => log('Socket disconnected...'));
  }

  static void listenToEvents() {
    _socket.onAny((event, data) {
      switch (event) {
        case 'sanction':
          {
            return NotificationService.showNotification();
          }
        case 'faute':
          {
            return NotificationService.showNotification();
          }
        default:
      }
    });
  }
}
