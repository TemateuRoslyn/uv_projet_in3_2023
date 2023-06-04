import 'package:flutter/material.dart';

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
