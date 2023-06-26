import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

class RoundOption extends StatelessWidget {
  final ImageProvider<Object> imagePath;
  final String title;
  final double radius;

  const RoundOption({
    super.key,
    required this.imagePath,
    required this.title,
    this.radius = 45.0,
  });
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            margin: EdgeInsets.only(
              top: getWidth(50.0, context),
              left: getWidth(30.0, context),
            ),
            width: radius * 2,
            height: radius * 2,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
            ),
            child: CircleAvatar(
              radius: radius,
              backgroundColor: Colors.white,
              backgroundImage: imagePath,
            ),
          ),
          const SizedBox(height: 5.0),
          Text(
            textAlign: TextAlign.center,
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
