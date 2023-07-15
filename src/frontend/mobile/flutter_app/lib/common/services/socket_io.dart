import 'dart:developer';
import 'package:fltter_app/common/services/notification_service.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketIO {
  static final IO.Socket _socket = IO.io(
      'https://9534-129-0-80-202.ngrok-free.app',
      // 'https://11e9-129-0-80-138.ngrok-free.app',
      IO.OptionBuilder()
          .setTransports(['websocket']) // for Flutter or Dart VM
          .disableAutoConnect() // disable auto-connection
          .setExtraHeaders({'foo': 'bar'}) // optional
          .build());

  static void initSocketIO() async {
    _socket.connect();
    // _socket.onConnect((data) => log('Socket connection established, $data'));
    _socket.onConnectError((data) => log('Socket connection error, $data'));
    _socket.onDisconnect((data) => log('Socket disconnected...'));

    _socket.on('test-message', (data) => print('event received'));
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
