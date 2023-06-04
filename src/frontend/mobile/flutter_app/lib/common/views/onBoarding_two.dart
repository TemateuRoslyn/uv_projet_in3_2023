import 'package:fltter_app/common/views/onBoarding_one.dart';
import 'package:fltter_app/common/views/onBoarding_three.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../utils/constants.dart';
import '../utils/helper.dart';
import '../widgets/common_widgets.dart';

class OnBoardingTwo extends StatelessWidget {
  const OnBoardingTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appColors.onBoardingTwo,
      body: SafeArea(
          child: SingleChildScrollView(
        child: Column(
          // mainAxisSize: MainAxisSize.min,
          // mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            SizedBox(
              height: getHeight(60, context),
            ),
            Text(
              'Mark Home work\n   as completed',
              style: TextStyle(
                fontSize: getHeight(20, context),
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: getHeight(40, context),
            ),
            Image.asset(AppImages.onBoardingTwo),
            SizedBox(
              height: getHeight(150, context),
            ),
            CommonWidgets.roundedNextButton(
              action: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const OnBoardingThree())),
              height: getHeight(50, context),
              width: getWidth(50, context),
              iconSize: getHeight(15, context),
              color: appColors.tinary!,
              iconColor: Colors.white,
              iconData: Icons.arrow_forward_ios_sharp,
            ),
          ],
        ),
      )),
    );
  }
}
