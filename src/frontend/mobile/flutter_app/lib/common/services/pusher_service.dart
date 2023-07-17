import 'dart:convert';

import 'package:fltter_app/common/models/conseil_discipline.dart';
import 'package:fltter_app/common/models/convocation.dart';
import 'package:fltter_app/common/models/faute.dart';
import 'package:fltter_app/common/models/sanction.dart';
import 'package:fltter_app/common/models/user.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:pusher_client/pusher_client.dart';

import '../../repositories/auth_repository.dart';
import 'notification_service.dart';

class PusherService {
  static String appId = "1635057";
  // static String key = 'a5aea2934467e8c3e81c';
  static String key = "58e15baea9d6159af4a5";
  static String secret = "bcf8e2bdcf0ddabbed69";
  static String cluster = "eu";
  // static String hostAuthEndPoint =
  //     'https://salon-lounge.smartcodegroup.com/api/broadcasting/auth';
  static const port = 6001;
  static late PusherClient _pusher;

  static late ProfileCubit _profileCubit;
  static late HomeCubit _homeCubit;

  static initCubits({
    required ProfileCubit profileCubit,
    required HomeCubit homeCubit,
  }) {
    _profileCubit = profileCubit;
    _homeCubit = homeCubit;
  }

  static Future<void> initPusher() async {
    PusherOptions options = PusherOptions(
      wsPort: port,
      encrypted: true,
      // host: hostEndPoint,
      cluster: cluster,
      // auth: PusherAuth(
      //   hostAuthEndPoint,
      //   headers: {
      //     'Authorization': 'Bearer $token',
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      // ),
    );

    _pusher = PusherClient(key, options, autoConnect: true);
    await _pusher.connect();
    _pusher.onConnectionStateChange((state) {
      print(
          'previousState: ${state!.previousState}, currentState: ${state.currentState}');
    });
    _pusher.onConnectionError((error) {
      print('error: ${error!.message}, ${error.exception}');
    });
  }

  static Future<void> subscribeToSpecificChannel(
      String channelToSubscribe, String eventToListen) async {
    final channel = _pusher.subscribe(channelToSubscribe);

    await channel.bind(
      eventToListen,
      (event) async {
        final currentUserId = AuthRepository.getUserId;
        final currentUserType = AuthRepository.getUserType;
        final currentUserInState = _profileCubit.state.currentUser!;
        final eventBody = jsonDecode(event!.data!)['content'];
        final libelle = eventBody['libelle'];
        final studentConcernedId = eventBody['eleve']['id'];
        final studentName =
            eventBody['eleve']['firstName'] + eventBody['eleve']['lastName'];

        switch (event.channelName) {
          case 'faute':
            {
              final newFaute = Faute.fromJson(eventBody);
              if (currentUserId == studentConcernedId &&
                  currentUserType == 'eleves') {
                _homeCubit.addNewFaute(newFaute);

                NotificationService.showNotification(
                  title: 'Nouvelle Faute commise par vous',
                  body: libelle,
                  payLoad: 'faute',
                );
              }
              if (currentUserType == 'parents') {
                List<int> childrenId = [];
                print(currentUserInState.childrenAndThierClasses != null);
                print(currentUserInState.childrenAndThierClasses!.isNotEmpty);

                if (currentUserInState.childrenAndThierClasses != null &&
                    currentUserInState.childrenAndThierClasses!.isNotEmpty) {
                  for (var element
                      in currentUserInState.childrenAndThierClasses!) {
                    final childId = (element['child'] as User).id;
                    childrenId.add(childId);
                  }

                  if (childrenId.contains(studentConcernedId)) {
                    _homeCubit.addNewFaute(newFaute);

                    NotificationService.showNotification(
                      title: 'Nouvelle Faute commise par $studentName',
                      body: libelle,
                      payLoad: 'faute',
                    );
                  }
                }
              }
            }
            break;
          case 'sanction':
            {
              final sanction = Sanction.fromJson(eventBody);
              if (currentUserId == studentConcernedId &&
                  currentUserType == 'eleves') {
                _homeCubit.addNewSanction(sanction);

                NotificationService.showNotification(
                  title: 'Une nouvelle sanction vous est assignée',
                  body: libelle,
                  payLoad: 'sanction',
                );
              }
              if (currentUserType == 'parents') {
                List<int> childrenId = [];

                if (currentUserInState.childrenAndThierClasses != null &&
                    currentUserInState.childrenAndThierClasses!.isNotEmpty) {
                  for (var element
                      in currentUserInState.childrenAndThierClasses!) {
                    final childId = (element['child'] as User).id;
                    childrenId.add(childId);
                  }

                  if (childrenId.contains(studentConcernedId)) {
                    _homeCubit.addNewSanction(sanction);

                    NotificationService.showNotification(
                      title: 'Nouvelle sanction assignée à $studentName',
                      body: libelle,
                      payLoad: 'sanction',
                    );
                  }
                }
              }
            }
            break;
          case 'conseil-discipline':
            {
              final cd = ConseilDiscipline.fromJson(eventBody);
              if (currentUserId == studentConcernedId &&
                  currentUserType == 'eleves') {
                _homeCubit.addNewCD(cd);

                NotificationService.showNotification(
                  title: 'Nouveau conseil de discipline',
                  body: libelle,
                  payLoad: 'cd',
                );
              }
              if (currentUserType == 'parents') {
                List<int> childrenId = [];

                if (currentUserInState.childrenAndThierClasses != null &&
                    currentUserInState.childrenAndThierClasses!.isNotEmpty) {
                  for (var element
                      in currentUserInState.childrenAndThierClasses!) {
                    final childId = (element['child'] as User).id;
                    childrenId.add(childId);
                  }

                  if (childrenId.contains(studentConcernedId)) {
                    _homeCubit.addNewCD(cd);

                    NotificationService.showNotification(
                      title:
                          'Nouveau conseil de discipline concernant votre enfant $studentName',
                      body: libelle,
                      payLoad: 'cd',
                    );
                  }
                }
              }
            }
            break;
          case 'convocation':
            {
              final convocation = Convocation.fromJson(eventBody);
              if (currentUserId == studentConcernedId &&
                  currentUserType == 'eleves') {
                _homeCubit.addNewConvocation(convocation);

                NotificationService.showNotification(
                  title: 'Vous êtes à nouveau convoquer',
                  body: libelle,
                  payLoad: 'convocation',
                );
              }
              if (currentUserType == 'parents') {
                List<int> childrenId = [];

                if (currentUserInState.childrenAndThierClasses != null &&
                    currentUserInState.childrenAndThierClasses!.isNotEmpty) {
                  for (var element
                      in currentUserInState.childrenAndThierClasses!) {
                    final childId = (element['child'] as User).id;
                    childrenId.add(childId);
                  }

                  if (childrenId.contains(studentConcernedId)) {
                    _homeCubit.addNewConvocation(convocation);

                    NotificationService.showNotification(
                      title:
                          'Nouvelle convocation concernant votre enfant $studentName',
                      body: libelle,
                      payLoad: 'convocation',
                    );
                  }
                }
              }
            }
            break;
          default:
            {}
        }
      },
    );
  }

  static Future<void> unSubscribeToSpecificChannel(
      String channelToUnSubscribe) async {
    await _pusher.unsubscribe(channelToUnSubscribe);
  }

  static Future<void> disconnectFromPusher() async {
    await _pusher.disconnect();
  }
}
