import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/home/widgets/convocation_component.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

import '../../../common/models/user.dart';
import '../../../common/utils/helper.dart';

class ConseilDisciplinePage extends StatefulWidget {
  const ConseilDisciplinePage({
    super.key,
    this.childInfos,
  });

  final User? childInfos;

  @override
  State<ConseilDisciplinePage> createState() => _ConseilDisciplinePageState();
}

class _ConseilDisciplinePageState extends State<ConseilDisciplinePage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    if (widget.childInfos == null) {
      _homeCubit.getDataByType(dataType: 'cd');
    } else {
      _homeCubit.getDataByType(dataType: 'cd', childId: widget.childInfos!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
      headerText: 'Mes conseils de disciplines',
      body: BlocBuilder<HomeCubit, HomeState>(
        buildWhen: (previous, current) =>
            (previous.cdStatus != current.cdStatus ||
                previous.cds != current.cds),
        builder: (context, state) {
          return CheckInternetConnectionPage(
              helper: state.cds.isEmpty ? 0 : 1,
              positionFromTop: (screenSize.height / 2),
              errorTextColor: appColors.black!,
              body: state.cdStatus == ApiStatus.isLoading
                  ? CommonWidgets.circularProgressIndicatorWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      color: appColors.white!)
                  : state.cdStatus == ApiStatus.failed
                      ? CommonWidgets.failedStatusWidget(
                          positionFromTop: (screenSize.height / 2),
                          context: context,
                          statusMessage: state.cdStatusMessage,
                          color: appColors.black!,
                          reloadFunction: () {
                            if (widget.childInfos == null) {
                              _homeCubit.getDataByType(dataType: 'cd');
                            } else {
                              _homeCubit.getDataByType(
                                  dataType: 'cd',
                                  childId: widget.childInfos!.id);
                            }
                          })
                      : state.cds.isEmpty
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
                              children: state.cds
                                  .map((cd) => ConvocationComponent(
                                      libelle: 'Motif: ${cd.faute.libelle}',
                                      subtitle1: 'Date: ${cd.dateCd}',
                                      subtitle2:
                                          'Heure: ${cd.heureDebutCd} - ${cd.heureFinCd}',
                                      isFrom: 'convocations'))
                                  .toList(),
                            )));
        },
      ),
    );
  }
}
