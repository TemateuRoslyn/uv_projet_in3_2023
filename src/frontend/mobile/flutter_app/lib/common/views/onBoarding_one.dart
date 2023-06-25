import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/onBoarding_two.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:flutter/material.dart';

class OnBoardingOne extends StatelessWidget {
  const OnBoardingOne({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appColors.onBoardingOne,
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
            Image.asset(AppImages.onBoardingOne),
            SizedBox(
              height: getHeight(60, context),
            ),
            CommonWidgets.roundedNextButton(
              action: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const OnBoardingTwo())),
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
