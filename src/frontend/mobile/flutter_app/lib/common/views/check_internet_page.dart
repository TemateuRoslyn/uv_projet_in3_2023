import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../logics/internet/internet_cubit.dart';

class CheckInternetConnectionPage extends StatefulWidget {
  const CheckInternetConnectionPage({
    super.key,
    // required this.refreshFunction,
    required this.positionFromTop,
    required this.body,
    required this.errorTextColor,
    this.helper,
  });

  final Widget body;
  // final void Function()? refreshFunction;
  final double positionFromTop;
  final int? helper; // 0 = no data in current state, 1 = data in state
  final Color errorTextColor;

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
          if (widget.helper != null) {
            switch (widget.helper) {
              case 0:
                return CommonWidgets.noInternetWidget(
                  positionFromTop: widget.positionFromTop,
                  context: context,
                  color: widget.errorTextColor,
                );
              case 1:
                return widget.body;
              default:
                return CommonWidgets.noInternetWidget(
                    positionFromTop: widget.positionFromTop,
                    context: context,
                    color: widget.errorTextColor);
            }
          } else {
            return CommonWidgets.noInternetWidget(
                positionFromTop: widget.positionFromTop,
                context: context,
                color: widget.errorTextColor);
          }
        }
      },
    );
  }
}
