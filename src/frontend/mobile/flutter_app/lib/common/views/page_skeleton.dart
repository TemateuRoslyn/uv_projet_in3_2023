import 'package:fltter_app/common/logics/navigation/cubit/navigation_cubit.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/features/home/views/home_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../features/profile/views/profile_page.dart';
import '../styles/colors.dart';

class PageSkeleton extends StatefulWidget {
  const PageSkeleton({
    super.key,
  });

  @override
  State<PageSkeleton> createState() => _PageSkeletonState();
}

class _PageSkeletonState extends State<PageSkeleton> {
  late NavigationCubit _navigationCubit;

  @override
  void initState() {
    super.initState();

    _navigationCubit = context.read<NavigationCubit>();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<NavigationCubit, NavigationState>(
      builder: (context, state) {
        final navigationType = state.navigationType;
        return Scaffold(
          backgroundColor: navigationType == NavigationType.profile
              ? appColors.primary
              : Colors.white,
          body: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // skeleton body here
                if (navigationType == NavigationType.home) const HomePage(),
                if (navigationType == NavigationType.stats) const HomePage(),
                if (navigationType == NavigationType.profile)
                  const ProfilePage(),

                // global navigation bar here
                Container(
                  height: getHeight(80, context),
                  width: double.infinity,
                  color: const Color(0xfffafafa),
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
                              ? appColors.primary
                              : Colors.grey,
                        ),
                      ),
                      IconButton(
                        onPressed: () => _navigationCubit
                            .changeNavigationType(NavigationType.stats),
                        icon: Icon(
                          Icons.stacked_bar_chart,
                          size: getHeight(30, context),
                          color: navigationType == NavigationType.stats
                              ? appColors.primary
                              : Colors.grey,
                        ),
                      ),
                      IconButton(
                        onPressed: () => _navigationCubit
                            .changeNavigationType(NavigationType.profile),
                        icon: Icon(
                          Icons.person,
                          size: getHeight(30, context),
                          color: navigationType == NavigationType.profile
                              ? appColors.primary
                              : Colors.grey,
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
