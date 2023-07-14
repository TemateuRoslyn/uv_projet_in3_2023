import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../utils/helper.dart';

class Modals {
  static ScaffoldFeatureController<SnackBar, SnackBarClosedReason>
      showScaffoldMessenger({
    required BuildContext context,
    required String content,
    required String type,
  }) {
    return ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        duration: const Duration(seconds: 5),
        backgroundColor:
            type == 'success' ? appColors.ligthGreen : appColors.ligthGreen,
        content: Text(
          content,
          style: TextStyle(
              fontSize: getHeight(15, context), color: appColors.primary),
        )));
  }
}
