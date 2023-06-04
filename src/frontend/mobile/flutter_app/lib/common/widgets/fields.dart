import 'package:dropdown_textfield/dropdown_textfield.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import '../styles/colors.dart';
import '../utils/helper.dart';

class Fields extends StatelessWidget {
  final String fieldType;
  final Widget? prefixIcon;
  final String? labelText;
  final Function()? onTapAction;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final void Function(String)? onChanged;
  final bool? setObscureText;

  final Function(PhoneNumber)? phoneonInputChanged;
  final Function(bool)? phoneonInputValidated;
  final String? Function(String?)? phonevalidator;
  final Function(PhoneNumber)? phoneonSaved;
  final TextEditingController? phonecontroller;
  final String? phonehintText;

  final String? dateLabelText;
  final Icon? datePrefixIcon;
  final TextEditingController? dateController;
  final String? Function(String?)? dateValidator;

  final SingleValueDropDownController? dropDownController;
  final String? Function(String?)? dropDownValidator;
  final String? dropDownLabelText;
  final int? dropDownItemCount;
  final List<DropDownValueModel>? dropDownList;
  final Icon? dropDownPrefixIcon;

  bool? emailTap;
  bool? passwordTap;
  Fields(
      {this.prefixIcon,
      this.labelText,
      this.onTapAction,
      this.controller,
      this.validator,
      this.onChanged,
      this.setObscureText,
      this.phoneonInputChanged,
      this.phoneonInputValidated,
      this.phonevalidator,
      this.phoneonSaved,
      this.phonecontroller,
      this.phonehintText,
      this.dateLabelText,
      this.datePrefixIcon,
      this.dateController,
      this.dateValidator,
      this.dropDownController,
      this.dropDownValidator,
      this.dropDownLabelText,
      this.dropDownItemCount,
      this.dropDownList,
      this.dropDownPrefixIcon,
      this.emailTap,
      this.passwordTap,
      required this.fieldType,
      super.key});

  @override
  Widget build(BuildContext context) {
    String initialIso = 'CM';
    String initialDial = '237';
    switch (fieldType) {
      case 'simpleInput':
        return TextFormField(
          onTap: onTapAction,
          cursorColor: appColors.primary,
          // initialValue: initialValue,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            filled: emailTap! ? true : false,
            fillColor: Colors.white.withOpacity(0.1),
            prefixIcon: prefixIcon,
            labelText: labelText,
            labelStyle: const TextStyle(
              color: Colors.white,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: BorderSide(width: 1, color: appColors.primary!),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: BorderSide(
                  width: 1, color: appColors.primary!.withOpacity(0.5)),
            ),
            errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            focusedErrorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            // hintStyle: const TextStyle(
            //   color: Colors.grey,
            // ),
            contentPadding: EdgeInsets.symmetric(
              vertical: getHeight(20, context),
              horizontal: getWidth(16, context),
            ),
          ),
          controller: controller,
          validator: validator,
          onChanged: onChanged,
        );

      case 'passwordInput':
        return TextFormField(
          onTap: onTapAction,
          cursorColor: appColors.primary,
          keyboardType: TextInputType.visiblePassword,
          // initialValue: initialValue,
          style: const TextStyle(
            color: Colors.white,
          ),
          decoration: InputDecoration(
            filled: passwordTap! ? true : false,
            fillColor: Colors.white.withOpacity(0.1),
            prefixIcon: prefixIcon,
            labelText: labelText,
            labelStyle: const TextStyle(
              color: Colors.white,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: BorderSide(width: 1, color: appColors.primary!),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: BorderSide(
                  width: 1, color: appColors.primary!.withOpacity(0.5)),
            ),
            errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            focusedErrorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            // hintStyle: const TextStyle(
            //   color: Colors.grey,
            // ),
            contentPadding: EdgeInsets.symmetric(
              vertical: getHeight(20, context),
              horizontal: getWidth(16, context),
            ),
          ),
          controller: controller,
          validator: validator,
          onChanged: onChanged,
          obscureText: setObscureText!,
        );

      case 'phoneInput':
        return Container(
          width: getWidth(400, context),
          decoration: BoxDecoration(
              color: Colors.transparent,
              border:
                  Border.all(width: 1, color: Colors.black.withOpacity(0.05))),
          child: Padding(
            padding: EdgeInsets.only(
              left: getWidth(19, context),
            ),
            child: InternationalPhoneNumberInput(
              // isEnabled: false,
              initialValue: (PhoneNumber(
                // phoneNumber: context.read<UserProvider>().userPhone,
                isoCode: initialIso,
                dialCode: initialDial,
              )),
              cursorColor: appColors.primary,
              onInputChanged: phoneonInputChanged,
              // initialValue: initialNumber,
              onInputValidated: phoneonInputValidated,
              selectorConfig: const SelectorConfig(
                selectorType: PhoneInputSelectorType.BOTTOM_SHEET,
              ),
              ignoreBlank: true,
              validator: phonevalidator,
              autoValidateMode: AutovalidateMode.always,
              selectorTextStyle: const TextStyle(color: Colors.black),
              textFieldController: phonecontroller,
              formatInput: true,
              scrollPadding: EdgeInsets.zero,
              keyboardType: const TextInputType.numberWithOptions(
                  signed: true, decimal: true),
              inputDecoration: InputDecoration(
                hintText: phonehintText,
                // enabledBorder: OutlineInputBorder(
                //   borderSide:
                //       BorderSide(width: 1, color: Colors.black.withOpacity(0.05)),
                // ),
                // focusedBorder: OutlineInputBorder(
                //   borderSide: BorderSide(
                //       width: 1, color: appColors.primary!.withOpacity(0.5)),
                // ),
                errorBorder: OutlineInputBorder(
                    borderSide:
                        BorderSide(width: 1, color: Colors.red.shade800)),
                focusedErrorBorder: OutlineInputBorder(
                    borderSide:
                        BorderSide(width: 1, color: Colors.red.shade800)),
                contentPadding: EdgeInsets.symmetric(
                  vertical: getHeight(20, context),
                  horizontal: getWidth(16, context),
                ),
              ),
              onSaved: phoneonSaved,
            ),
          ),
        );

      case 'dateInput':
        return TextFormField(
          showCursor: false,
          readOnly: true,
          onTap: () async {
            DateTime? choosenDate = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime(2000),
                lastDate: DateTime.now(),
                builder: (context, child) => Theme(
                      data: ThemeData().copyWith(
                        colorScheme: ColorScheme.dark(
                          primary: appColors.primary!,
                          onPrimary: Colors.white,
                          surface: appColors.primary!,
                          onSurface: Colors.black,
                        ),
                      ),
                      child: child!,
                    ));
            if (choosenDate == null) {
              return;
            } else {
              // ignore: use_build_context_synchronously
              // context.read<RegisterCubit>().birthDateController.text =
              //     DateFormat("dd-MM-yyyy").format(choosenDate).toString();
            }
          },
          cursorColor: appColors.primary,
          // initialValue: initialValue,
          decoration: InputDecoration(
            prefixIcon: datePrefixIcon,
            labelText: dateLabelText,
            enabledBorder: OutlineInputBorder(
              borderSide:
                  BorderSide(width: 1, color: Colors.black.withOpacity(0.05)),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(
                  width: 1, color: appColors.primary!.withOpacity(0.5)),
            ),
            errorBorder: OutlineInputBorder(
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            focusedErrorBorder: OutlineInputBorder(
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            contentPadding: EdgeInsets.symmetric(
              vertical: getHeight(20, context),
              horizontal: getWidth(16, context),
            ),
          ),
          controller: dateController,
          validator: dateValidator,
        );

      case 'dropDownInput':
        return DropDownTextField(
          controller: dropDownController,
          clearOption: false,
          enableSearch: true,
          validator: dropDownValidator,
          textFieldDecoration: InputDecoration(
            prefixIcon: dropDownPrefixIcon,
            labelText: dropDownLabelText,
            enabledBorder: OutlineInputBorder(
              borderSide:
                  BorderSide(width: 1, color: Colors.black.withOpacity(0.05)),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(
                  width: 1, color: appColors.primary!.withOpacity(0.5)),
            ),
            errorBorder: OutlineInputBorder(
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            focusedErrorBorder: OutlineInputBorder(
                borderSide: BorderSide(width: 1, color: Colors.red.shade800)),
            contentPadding: EdgeInsets.symmetric(
              vertical: getHeight(20, context),
              horizontal: getWidth(16, context),
            ),
          ),
          dropDownItemCount: dropDownItemCount!,
          dropDownList: dropDownList!,
          // onChanged: onChangedValueAction,
        );

      default:
        return const SizedBox();
    }
  }
}
