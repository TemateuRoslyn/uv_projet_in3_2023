import 'package:fltter_app/common/styles/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../logics/internet/internet_cubit.dart';
import '../utils/helper.dart';

class CheckInternetConnectionPage extends StatefulWidget {
  const CheckInternetConnectionPage({
    super.key,
    required this.refreshFunction,
    required this.positionFromTop,
    required this.body,
  });

  final Widget body;
  final void Function()? refreshFunction;
  final double positionFromTop;

  @override
  State<CheckInternetConnectionPage> createState() =>
      _CheckInternetConnectionPageState();
}

class _CheckInternetConnectionPageState
    extends State<CheckInternetConnectionPage> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<InternetCubit, InternetState>(
      builder: (context, state) {
        if (state is Connected) {
          return widget.body;
        } else {
          return Padding(
            padding: EdgeInsets.only(
                top: getHeight(widget.positionFromTop, context),
                left: getWidth(50, context),
                right: getWidth(50, context)),
            child: Text(
              'Assurez vous d\'être connecté à internet...',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: getHeight(12, context),
                height: getHeight(1.5, context),
                color: Colors.white,
              ),
            ),
          );
        }
      },
    );
  }
}
