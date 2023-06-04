import 'package:fltter_app/common/styles/colors.dart';
import 'package:flutter/material.dart';

class LoadingPage extends StatelessWidget {
  const LoadingPage({
    super.key,
    required this.requestType,
  });

  final String requestType; //post or get request

  @override
  Widget build(BuildContext context) {
    return requestType == 'post'
        ? CircularProgressIndicator(
            color: appColors.primary,
            strokeWidth: 1,
          )
        : const SizedBox();
  }
}
