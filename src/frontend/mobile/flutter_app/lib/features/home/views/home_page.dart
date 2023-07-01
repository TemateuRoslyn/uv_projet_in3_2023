import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/features/home/views/fautes_sanctions_page.dart';
import 'package:fltter_app/features/home/views/reglements_interieurs_page.dart';
import 'package:fltter_app/features/home/views/suggestion_page.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../common/logics/navigation/navigation_cubit.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';
import '../widgets/home_component.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late ProfileCubit _profileCubit;
  late NavigationCubit _navigationCubit;

  @override
  void initState() {
    super.initState();

    _profileCubit = context.read<ProfileCubit>();
    _navigationCubit = context.read<NavigationCubit>();

    if (_profileCubit.state.currentUser == null) _profileCubit.getCurrentUser();
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    final List<Map<String, dynamic>> homeComponents = [
      {'image': '', 'subtitle': 'Dashboard', 'onPressAction': () {}},
      {
        'image': '',
        'subtitle': 'Mes fautes et sanctions',
        'onPressAction': () => Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => const FautesEtSanctionsPage()))
      },
      {
        'image': '',
        'subtitle': 'Reglements interieurs',
        'onPressAction': () => Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => const ReglementsInterieurs()))
      },
      {'image': '', 'subtitle': 'Mes cours', 'onPressAction': () {}},
      {
        'image': '',
        'subtitle': 'Mes conseils de discipline',
        'onPressAction': () {}
      },
      {
        'image': '',
        'subtitle': 'Boîte à suggestions',
        'onPressAction': () => Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => const Suggestion()))
      },
      {'image': '', 'subtitle': 'Rapport de notes', 'onPressAction': () {}},
      {'image': '', 'subtitle': 'Mes convocations', 'onPressAction': () {}},
      {
        'image': '',
        'subtitle': 'Mon profile',
        'onPressAction': () =>
            _navigationCubit.changeNavigationType(NavigationType.profile)
      },
    ];

    return BlocBuilder<ProfileCubit, ProfileState>(
      // buildWhen: (previous, current) =>
      //     previous.currentUser != current.currentUser,
      builder: (context, state) {
        final currentUser = state.currentUser;
        return CheckInternetConnectionPage(
            helper: state.currentUser == null ? 0 : 1,
            positionFromTop: (screenSize.height / 2),
            errorTextColor: Colors.white,
            body: state.status == ApiStatus.isLoading
                ? CommonWidgets.circularProgressIndicatorWidget(
                    positionFromTop: (screenSize.height / 2),
                    context: context,
                    color: appColors.onBoardingTwo!)
                : state.status == ApiStatus.failed
                    ? CommonWidgets.loadingStatusFailedWidget(
                        positionFromTop: (screenSize.height / 2),
                        context: context,
                        statusMessage: state.statusMessage,
                        color: Colors.white,
                        reloadFunction: () => _profileCubit.getCurrentUser())
                    : Expanded(
                        child: ListView(
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                  top: getHeight(20, context),
                                  right: getWidth(10, context),
                                  left: getWidth(10, context)),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  SizedBox(
                                    child: Row(
                                      children: [
                                        ClipRRect(
                                          borderRadius:
                                              BorderRadius.circular(100),
                                          child: Image.asset(
                                            AppImages.unknownPersonImg,
                                            height: getHeight(40, context),
                                            width: getWidth(40, context),
                                            // color: Colors.white,
                                          ),
                                        ),
                                        Colonne(
                                            text1:
                                                '${currentUser!.firstName} ${currentUser.lastName}',
                                            text2: currentUser.classe!['name']),
                                      ],
                                    ),
                                  ),
                                  Colonne(
                                      text1: 'Redouble',
                                      text2: currentUser.redoublant == 0
                                          ? 'NON'
                                          : 'OUI'),
                                ],
                              ),
                            ),
                            SizedBox(
                              height: getHeight(70, context),
                            ),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 20),
                              child: Wrap(
                                  runSpacing: getHeight(30, context),
                                  spacing: getWidth(10, context),
                                  children: homeComponents
                                      .map((homeComponent) => HomeComponent(
                                            subtitle: homeComponent['subtitle'],
                                            onPressAction:
                                                homeComponent['onPressAction'],
                                          ))
                                      .toList()),
                            )
                          ],
                        ),
                      ));
      },
    );
  }
}

class Colonne extends StatelessWidget {
  const Colonne({
    super.key,
    required this.text1,
    required this.text2,
    // required this.isFirst,
  });

  final String text1;
  final String text2;
  // final bool isFirst;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: getWidth(10, context)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            text1,
            style: TextStyle(
                fontSize: getHeight(13, context), color: Colors.white),
          ),
          // SizedBox(
          //   height: getHeight(10, context),
          // ),
          Text(
            text2,
            style: TextStyle(
              fontSize: getHeight(12, context),
              color: Colors.white.withOpacity(0.7),
            ),
          ),
        ],
      ),
    );
  }
}
