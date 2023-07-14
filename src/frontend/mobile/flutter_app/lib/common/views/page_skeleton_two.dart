import 'package:flutter/material.dart';
import '../styles/colors.dart';
import '../utils/helper.dart';

class PageSkeletonTwo extends StatefulWidget {
  const PageSkeletonTwo({
    super.key,
    required this.headerText,
    required this.body,
  });

  final String headerText;
  final Widget body;

  @override
  State<PageSkeletonTwo> createState() => _PageSkeletonTwoState();
}

class _PageSkeletonTwoState extends State<PageSkeletonTwo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // header part here
          Container(
            height: getHeight(100, context),
            width: double.infinity,
            decoration: BoxDecoration(
              color: appColors.white,
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(20),
              ),
            ),
            alignment: Alignment.center,
            child: Row(
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.arrow_back_rounded),
                      color: appColors.primary,
                    ),
                    Text(
                      widget.headerText,
                      style: TextStyle(
                          fontSize: getHeight(25, context),
                          fontWeight: FontWeight.bold,
                          color: appColors.primary),
                    ),
                  ],
                )
              ],
            ),
          ),

          // body part here
          widget.body
        ],
      ),
    );
  }
}
