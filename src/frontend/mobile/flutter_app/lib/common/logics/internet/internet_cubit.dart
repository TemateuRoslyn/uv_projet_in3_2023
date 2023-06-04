import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:connectivity/connectivity.dart';
import 'package:equatable/equatable.dart';

import '../../utils/enums.dart';

part 'internet_state.dart';

class InternetCubit extends Cubit<InternetState> {
  final Connectivity connectivity;
  late StreamSubscription connectivityStreamSubscription;
  InternetCubit({
    required this.connectivity,
  }) : super(Disconnected(connectionType: ConnectionType.noInternet)) {
    monitorInternetConnection();
  }

  StreamSubscription<ConnectivityResult> monitorInternetConnection() {
    return connectivityStreamSubscription =
        connectivity.onConnectivityChanged.listen((event) {
      if (event == ConnectivityResult.wifi) {
        emit(Connected(connectionType: ConnectionType.wifi));
      }
      if (event == ConnectivityResult.mobile) {
        emit(Connected(connectionType: ConnectionType.mobile));
      }
      if (event == ConnectivityResult.none) {
        emit(Disconnected(connectionType: ConnectionType.noInternet));
      }
    });
  }

  Future<bool> checkInternetConnection() async {
    final hasConnection = await connectivity.checkConnectivity();

    return hasConnection != ConnectivityResult.none;
  }

  @override
  Future<void> close() {
    connectivityStreamSubscription.cancel();
    return super.close();
  }
}
