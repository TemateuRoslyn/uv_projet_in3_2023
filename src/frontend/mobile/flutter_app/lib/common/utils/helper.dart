import 'package:flutter/material.dart';

import '../styles/colors.dart';

double getHeight(double value, BuildContext context) {
  double size = 0;
  size = (MediaQuery.of(context).size.height * value) / 812;
  return size;
}

double getWidth(double value, BuildContext context) {
  double size = 0;
  size = (MediaQuery.of(context).size.width * value) / 375;
  return size;
}

String formatString(String value) {
  final formattedString = value.split(' ').join('');
  return formattedString;
}

bool isUrlValid(String urlString) {
  bool isValid = false;
  try {
    Uri.parse(urlString).isAbsolute;
    isValid = true;
  } catch (e) {
    print(e.toString());
  }
  return isValid;
}

Color componentColor(int number) {
  late Color color;
  if (number == 0) {
    color = appColors.secondary!;
  } else if (number >= 1 && number <= 3) {
    color = Colors.grey;
  } else if (number > 3) {
    color = appColors.ligthGreen!;
  }

  return color;
}
