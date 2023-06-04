part of 'internet_cubit.dart';

abstract class InternetState extends Equatable {
  @override
  List<Object?> get props => [];
}

class Connected extends InternetState {
  final ConnectionType connectionType;

  Connected({
    required this.connectionType,
  });

  @override
  List<Object?> get props => [connectionType];
}

class Disconnected extends InternetState {
  final ConnectionType connectionType;

  Disconnected({
    required this.connectionType,
  });

  @override
  List<Object?> get props => [connectionType];
}
