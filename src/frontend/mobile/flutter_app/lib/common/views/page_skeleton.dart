import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/features/home/views/home_page.dart';
import 'package:fltter_app/features/home/views/student_statistics_page.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../features/home/logic/home_cubit.dart';
import '../../features/profile/logic/profile_cubit.dart';
import '../../features/profile/views/profile_page.dart';
import '../logics/navigation/navigation_cubit.dart';
import '../services/pusher_service.dart';
import '../styles/colors.dart';

class PageSkeleton extends StatefulWidget {
  const PageSkeleton({
    super.key,
    // this.refreshFunction,
  });

  // final Future<void> Function()? refreshFunction;

  @override
  State<PageSkeleton> createState() => _PageSkeletonState();
}

class _PageSkeletonState extends State<PageSkeleton> {
  late NavigationCubit _navigationCubit;
  late String _currentUserType;

  @override
  void initState() {
    super.initState();

    _navigationCubit = context.read<NavigationCubit>();
    _currentUserType = AuthRepository.getUserType;

    if (_navigationCubit.state.navigationType != NavigationType.home) {
      _navigationCubit.changeNavigationType(NavigationType.home);
    }

    PusherService.initCubits(
      profileCubit: context.read<ProfileCubit>(),
      homeCubit: context.read<HomeCubit>(),
    );
  }

  @override
  Widget build(BuildContext context) {
    // final screenSize = MediaQuery.of(context).size;

    return BlocBuilder<NavigationCubit, NavigationState>(
      builder: (context, state) {
        final navigationType = state.navigationType;
        return Scaffold(
          backgroundColor: appColors.primary,
          body: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // skeleton body here
                if (_currentUserType != 'parents') ...[
                  if (navigationType == NavigationType.home) const HomePage(),
                  if (navigationType == NavigationType.stats)
                    const StudentStatisticPage(),
                  if (navigationType == NavigationType.profile)
                    const ProfilePage(),
                ],

                if (_currentUserType == 'parents') const ProfilePage(),

                // global navigation bar here
                if (_currentUserType != 'parents')
                  Container(
                    height: getHeight(80, context),
                    width: double.infinity,
                    color: (navigationType == NavigationType.home ||
                            navigationType == NavigationType.stats)
                        ? appColors.white!.withOpacity(0.4)
                        : appColors.white!.withOpacity(0.4),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        IconButton(
                          onPressed: () => _navigationCubit
                              .changeNavigationType(NavigationType.home),
                          icon: Icon(
                            Icons.holiday_village,
                            size: getHeight(30, context),
                            color: navigationType == NavigationType.home
                                ? appColors.secondary
                                : appColors.primary,
                          ),
                        ),
                        IconButton(
                          onPressed: () => _navigationCubit
                              .changeNavigationType(NavigationType.stats),
                          icon: Icon(
                            Icons.stacked_bar_chart,
                            size: getHeight(30, context),
                            color: navigationType == NavigationType.stats
                                ? appColors.secondary
                                : appColors.primary,
                          ),
                        ),
                        IconButton(
                          onPressed: () => _navigationCubit
                              .changeNavigationType(NavigationType.profile),
                          icon: Icon(
                            Icons.person,
                            size: getHeight(30, context),
                            color: navigationType == NavigationType.profile
                                ? appColors.secondary
                                : appColors.primary,
                          ),
                        ),
                      ],
                    ),
                  )
              ],
            ),
          ),
        );
      },
    );
  }
}
