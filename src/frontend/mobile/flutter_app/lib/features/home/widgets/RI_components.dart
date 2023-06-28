import 'package:flutter/material.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/helper.dart';

class RIcomponents extends StatelessWidget {
  const RIcomponents({
    super.key,
    required this.text,
  });

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: getHeight(10, context)),
      padding: EdgeInsets.symmetric(
          vertical: getHeight(15, context), horizontal: getWidth(15, context)),
      // height: getHeight(80, context),
      width: double.infinity,
      decoration: BoxDecoration(
        color: appColors.primary,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        text,
        // textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: getHeight(12, context),
          height: getHeight(1.5, context),
          // fontWeight: middleCard ? FontWeight.bold : null,
          color: Colors.white,
        ),
      ),
    );
  }
}
