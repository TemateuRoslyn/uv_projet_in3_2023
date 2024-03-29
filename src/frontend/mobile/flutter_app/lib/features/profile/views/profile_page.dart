import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/logics/navigation/navigation_cubit.dart';
import 'package:fltter_app/common/logics/speech/speech_cubit.dart';
import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/features/authentication/views/login_page.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/home/widgets/cours_component.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:fltter_app/features/profile/views/parent_consultation_page.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../common/models/user.dart';
import '../../../common/utils/enums.dart';
import '../../../common/widgets/modals_and_animated_dialogs.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  // bool profileIsSelected = true;
  // bool modifyProfileIsSelected = false;
  User? _currentUser;
  late ProfileCubit _profileCubit;
  late HomeCubit _homeCubit;
  late SpeechCubit _speechCubit;
  late String currentUserType;

  @override
  void initState() {
    super.initState();

    _profileCubit = context.read<ProfileCubit>();
    _speechCubit = context.read<SpeechCubit>();
    _homeCubit = context.read<HomeCubit>();
    currentUserType = AuthRepository.getUserType;
    if (_profileCubit.state.currentUser != null) {
      _currentUser = _profileCubit.state.currentUser!;
    } else {
      _profileCubit.getCurrentUser(
          callback: () =>
              _speechCubit.startSpeeching(_profileCubit.state.textToSpeech));
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    final List profileTiles = [
      {
        'text': 'Changer mon mot de passe',
        'icon': Icons.arrow_forward_ios_rounded,
        'onPressAction': () {},
      },
      {
        'text': 'Me deconnecter',
        'icon': Icons.arrow_forward_ios_rounded,
        'onPressAction': () async {
          await _profileCubit.logOut(
            nextAction: () {
              context.read<HomeCubit>().clearState();
              context.read<ProfileCubit>().clearState();
              context.read<SpeechCubit>().clearState();
              context.read<NavigationCubit>().clearState();
              // ignore: use_build_context_synchronously
              Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => const LoginPage()),
                  (route) => false);
            },
          );
        }
      }
    ];

    final List colonnes = [
      {
        'text1': 'Hello...',
        'text2': _currentUser == null
            ? ''
            : '${_currentUser!.firstName} ${_currentUser!.lastName}',
        'isFirst': true,
      },
      {
        'text1': 'Faute(s)',
        'text2': _homeCubit.state.fautes.length.toString(),
        'isFirst': false,
      },
      {
        'text1': 'Sanction(s)',
        'text2': _homeCubit.state.sanctions.length.toString(),
        'isFirst': false,
      }
    ];

    return BlocBuilder<ProfileCubit, ProfileState>(
      builder: (context, state) {
        return CheckInternetConnectionPage(
          helper: state.currentUser == null ? 0 : 1,
          positionFromTop: (screenSize.height / 2),
          errorTextColor: appColors.black!,
          body: state.status == ApiStatus.isLoading
              ? CommonWidgets.circularProgressIndicatorWidget(
                  positionFromTop: (screenSize.height / 2),
                  context: context,
                  color: appColors.white!)
              : state.status == ApiStatus.failed
                  ? CommonWidgets.failedStatusWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      statusMessage: state.statusMessage,
                      color: appColors.black!,
                      reloadFunction: () => _profileCubit.getCurrentUser())
                  : BlocListener<HomeCubit, HomeState>(
                      listenWhen: (previous, current) =>
                          previous.suggestionStatus != current.suggestionStatus,
                      listener: (context, state) {
                        if (state.suggestionStatus == ApiStatus.isLoading) {
                          Modals.showScaffoldMessenger(
                            context: context,
                            content: state.suggestionStatusMessage,
                            type: 'success',
                          );
                        }
                        if (state.suggestionStatus == ApiStatus.success) {
                          Modals.showScaffoldMessenger(
                            context: context,
                            content: state.suggestionStatusMessage,
                            type: 'success',
                          );
                        }
                        if (state.suggestionStatus == ApiStatus.failed) {
                          Modals.showScaffoldMessenger(
                            context: context,
                            content: state.suggestionStatusMessage,
                            type: 'error',
                          );
                        }
                      },
                      child: Expanded(
                        child: ListView(
                          children: [
                            Stack(children: [
                              Container(
                                padding: EdgeInsets.only(
                                    top: getHeight(
                                      20,
                                      context,
                                    ),
                                    left: getWidth(10, context)),
                                // height: getHeight(50, context),
                                width: double.infinity,
                                // color: Colors.amber,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    if (currentUserType != 'parents')
                                      Text(
                                        'Paramètres',
                                        style: TextStyle(
                                            fontSize: getHeight(20, context),
                                            fontWeight: FontWeight.bold,
                                            color: appColors.black),
                                      ),
                                    SizedBox(
                                      height: getHeight(30, context),
                                    ),
                                    Row(
                                      children: [
                                        if (state.currentUser != null) ...[
                                          ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(100),
                                            child: state.currentUser!.photo ==
                                                    null
                                                ? Image.asset(
                                                    AppImages.unknownPersonImg,
                                                    height:
                                                        getHeight(60, context),
                                                    width:
                                                        getWidth(60, context),
                                                  )
                                                : CommonWidgets.renderImage(
                                                    imagePath: state
                                                        .currentUser!.photo!,
                                                    context: context),
                                          ),
                                        ],
                                        if (currentUserType == 'parents') ...[
                                          Colonne(
                                              currentUserType: currentUserType,
                                              isFirst: true,
                                              text1: 'Hello...',
                                              text2:
                                                  '${state.currentUser!.firstName} ${state.currentUser!.lastName}'),
                                          Colonne(
                                            currentUserType: currentUserType,
                                            isFirst: false,
                                            text1: 'Profession',
                                            text2:
                                                state.currentUser!.profession!,
                                          ),
                                        ],
                                        if (currentUserType == 'eleves') ...[
                                          ...colonnes.map((colonne) => Colonne(
                                              currentUserType: currentUserType,
                                              isFirst: colonne['isFirst'],
                                              text1: colonne['text1'],
                                              text2: colonne['text2'])),
                                        ],
                                      ],
                                    )
                                  ],
                                ),
                              ),
                              if (currentUserType == 'parents') ...[
                                BlocBuilder<SpeechCubit, SpeechState>(
                                  buildWhen: (previous, current) =>
                                      previous.speechType != current.speechType,
                                  builder: (context, state) {
                                    final currentSpeechTYpe = state.speechType;
                                    return Positioned(
                                        bottom: getHeight(50, context),
                                        right: getWidth(10, context),
                                        child: Container(
                                          height: getHeight(40, context),
                                          width: getWidth(40, context),
                                          decoration: BoxDecoration(
                                              shape: BoxShape.circle,
                                              color: appColors.secondary),
                                          // alignment: Alignment.center,
                                          child: IconButton(
                                            color: appColors.primary,
                                            onPressed: () {
                                              if (currentSpeechTYpe ==
                                                  SpeechType.isSpeeching) {
                                                _speechCubit.stopSpeeching();
                                              } else if (currentSpeechTYpe ==
                                                  SpeechType.speechClosed) {
                                                _speechCubit.startSpeeching(
                                                    _profileCubit
                                                        .state.textToSpeech);
                                              }
                                            },
                                            icon: Icon(
                                              currentSpeechTYpe ==
                                                      SpeechType.isSpeeching
                                                  ? Icons.stop
                                                  : currentSpeechTYpe ==
                                                          SpeechType
                                                              .speechClosed
                                                      ? Icons.play_arrow_rounded
                                                      : null,
                                              size: getHeight(20, context),
                                            ),
                                          ),
                                        ));
                                  },
                                ),
                                Positioned(
                                    bottom: getHeight(0, context),
                                    right: getWidth(10, context),
                                    child: InkWell(
                                      onTap: () => _profileCubit.logOut(
                                        nextAction: () {
                                          context
                                              .read<HomeCubit>()
                                              .clearState();
                                          context
                                              .read<ProfileCubit>()
                                              .clearState();
                                          context
                                              .read<SpeechCubit>()
                                              .clearState();
                                          context
                                              .read<NavigationCubit>()
                                              .clearState();
                                          // ignore: use_build_context_synchronously
                                          Navigator.of(context)
                                              .pushAndRemoveUntil(
                                                  MaterialPageRoute(
                                                      builder: (context) =>
                                                          const LoginPage()),
                                                  (route) => false);
                                        },
                                      ),
                                      child: Container(
                                        height: getHeight(40, context),
                                        width: getWidth(40, context),
                                        decoration: BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: appColors.ligthGreen),
                                        child: Icon(
                                          Icons.exit_to_app_outlined,
                                          size: getHeight(20, context),
                                          color: Colors.white,
                                        ),
                                      ),
                                    )),
                              ],
                            ]),
                            if (currentUserType == 'parents') ...[
                              Padding(
                                padding: EdgeInsets.only(
                                  bottom: getHeight(20, context),
                                  top: getHeight(50, context),
                                  right: getWidth(20, context),
                                  left: getWidth(20, context),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          'Mes Enfants...',
                                          style: TextStyle(
                                              fontSize: getHeight(20, context),
                                              fontWeight: FontWeight.bold,
                                              color: appColors.black),
                                        ),
                                        TextButton.icon(
                                          onPressed: () async {
                                            await CommonWidgets
                                                .suggestionBottomSheet(context);
                                          },
                                          icon: Icon(
                                            Icons.lightbulb,
                                            size: getHeight(20, context),
                                            color: appColors.secondary,
                                          ),
                                          label: Text(
                                            'Suggerer quelque chose ?',
                                            style: TextStyle(
                                                fontSize:
                                                    getHeight(11, context),
                                                fontWeight: FontWeight.bold,
                                                color: appColors.secondary),
                                          ),
                                        )
                                      ],
                                    ),
                                    SizedBox(
                                      height: getHeight(20, context),
                                    ),
                                    ...state
                                        .currentUser!.childrenAndThierClasses!
                                        .map((childData) {
                                      final child = childData['child'] as User;
                                      final hisClass = childData['hisClass'];
                                      final nbreFautes =
                                          childData['nbreFautes'];
                                      return CoursComponent(
                                          color: componentColor(nbreFautes),
                                          currentUserType: currentUserType,
                                          imagePath: child.photo,
                                          onPressAction: () => Navigator.of(
                                                  context)
                                              .push(MaterialPageRoute(
                                                  builder: (context) =>
                                                      ParentConsultationPage(
                                                        child: child,
                                                        hisClass: hisClass,
                                                      ))),
                                          courseTitle:
                                              '${child.firstName} ${child.lastName}',
                                          teacherName: hisClass['name']);
                                    }).toList(),
                                  ],
                                ),
                              ),
                            ],
                            if (currentUserType == 'eleves') ...[
                              SizedBox(
                                height: getHeight(20, context),
                              ),
                              ...ListTile.divideTiles(
                                  context: context,
                                  color: Colors.grey,
                                  tiles: profileTiles
                                      .map((profileTile) => ProfileTile(
                                            icon: profileTile['icon'],
                                            text: profileTile['text'],
                                            onPressAction:
                                                profileTile['onPressAction'],
                                          ))
                                      .toList()),
                            ],
                          ],
                        ),
                      ),
                    ),
        );
      },
    );
  }
}

class Colonne extends StatelessWidget {
  const Colonne({
    super.key,
    required this.text1,
    required this.text2,
    required this.isFirst,
    required this.currentUserType,
  });

  final String text1;
  final String text2;
  final bool isFirst;
  final String currentUserType;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: getWidth(10, context)),
      child: Column(
        crossAxisAlignment:
            isFirst ? CrossAxisAlignment.start : CrossAxisAlignment.center,
        children: [
          Text(
            text1,
            style: TextStyle(
                fontSize: getHeight(14, context),
                color: appColors.black,
                fontWeight: FontWeight.bold),
          ),
          SizedBox(
            height: getHeight(10, context),
          ),
          SizedBox(
            width: currentUserType == 'parents'
                ? getWidth(120, context)
                : getWidth(isFirst ? 100 : 20, context),
            child: Text(
              text2,
              textAlign: isFirst ? null : TextAlign.center,
              style: TextStyle(
                overflow: TextOverflow.ellipsis,
                fontSize: getHeight(15, context),
                color: appColors.black,
                // fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileTile extends StatelessWidget {
  const ProfileTile({
    super.key,
    required this.icon,
    required this.text,
    required this.onPressAction,
  });

  final IconData icon;
  final String text;
  final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressAction,
      child: ListTile(
        leading: Text(
          text,
          style: TextStyle(
              fontSize: getHeight(15, context),
              color: appColors.black,
              fontWeight: FontWeight.bold),
        ),
        trailing: Icon(
          icon,
          size: getHeight(13, context),
          color: appColors.black,
        ),
      ),
    );
  }
}

class ProfileOption extends StatelessWidget {
  const ProfileOption(
      {super.key,
      required this.icon,
      required this.text,
      required this.backgroundColor,
      required this.iconColor,
      required this.action});

  final IconData icon;
  final String text;
  final Color backgroundColor;
  final Color iconColor;
  final void Function()? action;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: action,
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.symmetric(horizontal: getWidth(10, context)),
            height: getHeight(60, context),
            width: getWidth(60, context),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: backgroundColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    blurRadius: 2,
                    // offset: Offset(4, 8), // Shadow position
                  ),
                ]),
            child: Icon(
              icon,
              size: getHeight(30, context),
              color: iconColor,
            ),
          ),
          SizedBox(
            height: getHeight(10, context),
          ),
          Text(
            text,
            style: TextStyle(
                fontSize: getHeight(11, context),
                color: Colors.black,
                fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
