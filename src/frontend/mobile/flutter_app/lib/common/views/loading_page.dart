import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

class LoadingPage extends StatelessWidget {
  const LoadingPage({
    super.key,
    required this.requestType,
    required this.body,
  });

  final String requestType; //post or get request
  final Widget body;

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    return requestType == 'post'
        ? Stack(
            children: [
              // body part here
              body,

              // loader part here
              Container(
                height: getHeight(screenSize.height, context),
                width: double.infinity,
                color: Colors.white,
                child: Center(
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: appColors.onBoardingTwo,
                  ),
                ),
              ),
            ],
          )
        : CircularProgressIndicator(
            strokeWidth: 2,
            color: appColors.onBoardingTwo,
          );
  }
}
