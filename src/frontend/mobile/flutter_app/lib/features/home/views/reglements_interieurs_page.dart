import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../widgets/RI_components.dart';

class ReglementsInterieurs extends StatefulWidget {
  const ReglementsInterieurs({super.key});

  @override
  State<ReglementsInterieurs> createState() => _ReglementsInterieursState();
}

class _ReglementsInterieursState extends State<ReglementsInterieurs> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    _homeCubit.getAllReglementInterieur();
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
      headerText: 'Reglements Interirieurs',
      body: BlocBuilder<HomeCubit, HomeState>(
        // buildWhen: (previous, current) => previous.ri != current.ri,
        builder: (context, state) {
          return CheckInternetConnectionPage(
            helper: state.ri.isEmpty ? 0 : 1,
            positionFromTop: (screenSize.height / 2),
            color: appColors.primary!,
            body: state.riStatus == ApiStatus.isLoading
                ? Padding(
                    padding: EdgeInsets.only(
                        top: getHeight((screenSize.height / 2), context)),
                    child: Center(
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: appColors.primary,
                      ),
                    ),
                  )
                : state.riStatus == ApiStatus.failed
                    ? Padding(
                        padding: EdgeInsets.only(
                            top: getHeight((screenSize.height / 2), context),
                            left: getWidth(50, context),
                            right: getWidth(50, context)),
                        child: Column(
                          children: [
                            Text(
                              state.riStatusMessage,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: getHeight(12, context),
                                height: getHeight(1.5, context),
                                color: appColors.primary,
                              ),
                            ),
                            TextButton(
                              onPressed: () =>
                                  _homeCubit.getAllReglementInterieur(),
                              child: Text(
                                'Recharger',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  decoration: TextDecoration.underline,
                                  fontSize: getHeight(12, context),
                                  color: appColors.secondary,
                                ),
                              ),
                            )
                          ],
                        ),
                      )
                    : Expanded(
                        child: ListView(
                        padding: EdgeInsets.only(
                          top: getHeight(20, context),
                          bottom: getHeight(10, context),
                          left: getWidth(10, context),
                          right: getWidth(10, context),
                        ),
                        children: state.ri
                            .map((e) => RIcomponents(text: e.libelle))
                            .toList(),
                      )),
          );
        },
      ),
    );
  }
}

// 
