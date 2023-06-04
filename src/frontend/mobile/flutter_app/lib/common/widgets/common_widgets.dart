import 'package:flutter/material.dart';
import '../utils/helper.dart';

class CommonWidgets {
  static ElevatedButton commonButton({
    required Function()? press,
    required String text,
    required Color color,
    required BuildContext context,
    required bool roundedBorders,
  }) {
    return ElevatedButton(
      onPressed: press,
      style: ElevatedButton.styleFrom(
        shape: roundedBorders
            ? RoundedRectangleBorder(borderRadius: BorderRadius.circular(30))
            : null,
        minimumSize: Size(getWidth(200, context), getHeight(65, context)),
        maximumSize: Size(getWidth(200, context), getHeight(65, context)),
        backgroundColor: color,
      ),
      child: FittedBox(
        fit: BoxFit.scaleDown,
        child: Text(
          text,
          style: TextStyle(
            fontSize: getHeight(18, context),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  static Widget roundedNextButton({
    required void Function()? action,
    required double height,
    width,
    iconSize,
    required Color color,
    iconColor,
    required IconData? iconData,
  }) {
    return InkWell(
      onTap: action,
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
            color: color, borderRadius: BorderRadius.circular(30.0)),
        alignment: Alignment.center,
        child: Icon(iconData, size: iconSize, color: iconColor),
      ),
    );
  }
}
