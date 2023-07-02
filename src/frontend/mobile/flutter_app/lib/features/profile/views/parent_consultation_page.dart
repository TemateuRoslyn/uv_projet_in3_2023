import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

class ParentConsultationPage extends StatelessWidget {
  const ParentConsultationPage({
    super.key,
    required this.childId,
  });

  final int childId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Container(
        height: getHeight(150, context),
        width: getWidth(130, context),
        decoration: BoxDecoration(color: Colors.teal),
      )),
    );
  }
}
