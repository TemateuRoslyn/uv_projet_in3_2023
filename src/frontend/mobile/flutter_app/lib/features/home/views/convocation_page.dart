import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/home/widgets/convocation_component.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

import '../../../common/models/user.dart';
import '../../../common/utils/enums.dart';
import '../../../common/utils/helper.dart';
import '../../../common/widgets/common_widgets.dart';

class ConvocationPage extends StatefulWidget {
  const ConvocationPage({
    super.key,
    this.childInfos,
  });

  final User? childInfos;

  @override
  State<ConvocationPage> createState() => _ConvocationPageState();
}

class _ConvocationPageState extends State<ConvocationPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    if (widget.childInfos == null) {
      _homeCubit.getDataByType(dataType: 'convocations');
    } else {
      _homeCubit.getDataByType(
          dataType: 'convocations', childId: widget.childInfos!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
      headerText: 'Mes convocations',
      body: BlocBuilder<HomeCubit, HomeState>(
        buildWhen: (previous, current) =>
            (previous.convocationStatus != current.convocationStatus ||
                previous.convocations != current.convocations),
        builder: (context, state) {
          return CheckInternetConnectionPage(
            positionFromTop: (screenSize.height / 2),
            errorTextColor: appColors.black!,
            body: state.convocationStatus == ApiStatus.isLoading
                ? CommonWidgets.circularProgressIndicatorWidget(
                    positionFromTop: (screenSize.height / 2),
                    context: context,
                    color: appColors.white!)
                : state.convocationStatus == ApiStatus.failed
                    ? CommonWidgets.failedStatusWidget(
                        positionFromTop: (screenSize.height / 2),
                        context: context,
                        statusMessage: state.convocationStatusMessage,
                        color: appColors.black!,
                        reloadFunction: () {
                          if (widget.childInfos == null) {
                            _homeCubit.getDataByType(dataType: 'convocations');
                          } else {
                            _homeCubit.getDataByType(
                                dataType: 'convocations',
                                childId: widget.childInfos!.id);
                          }
                        })
                    : state.convocations.isEmpty
                        ? CommonWidgets.noDataWidget(
                            positionFromTop: (screenSize.height / 2),
                            context: context,
                            color: appColors.black!)
                        : Expanded(
                            child: ListView(
                            padding: EdgeInsets.only(
                                top: getHeight(20, context),
                                left: getWidth(10, context),
                                right: getWidth(10, context)),
                            children: state.convocations
                                .map((convocation) => ConvocationComponent(
                                      libelle: 'Faute: ${convocation.libelle}',
                                      subtitle1:
                                          'Date de convocation: ${convocation.dateConvocation}',
                                      subtitle2:
                                          'Date de RDV: ${convocation.dateRdv}',
                                      statut: convocation.statut,
                                      isFrom: 'convocations',
                                      // onPressAction: () {},
                                    ))
                                .toList(),
                          )),
          );
        },
      ),
    );
  }
}
