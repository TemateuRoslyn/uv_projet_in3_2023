import 'package:flutter/material.dart';

class AppColors extends ThemeExtension<AppColors> {
  final Color? primary;
  final Color? danger;
  final Color? gray;
  final Color? purple;
  final Color? green;
  final Color? orange;
  final Color? yellow;
  final Color? ligthBlue;

  AppColors({
    required this.primary,
    required this.danger,
    required this.gray,
    required this.purple,
    required this.green,
    required this.orange,
    required this.yellow,
    required this.ligthBlue,
  });

  @override
  ThemeExtension<AppColors> copyWith({
    Color? primary,
    Color? danger,
    Color? gray,
    Color? purple,
    Color? green,
    Color? orange,
    Color? yellow,
    Color? ligthBlue,
  }) {
    return AppColors(
      primary: primary ?? this.primary,
      danger: danger ?? this.danger,
      gray: gray ?? this.gray,
      purple: purple ?? this.purple,
      green: green ?? this.green,
      orange: orange ?? this.orange,
      yellow: yellow ?? this.yellow,
      ligthBlue: yellow ?? this.ligthBlue,
    );
  }

  @override
  ThemeExtension<AppColors> lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }

    return AppColors(
      primary: Color.lerp(primary, other.primary, t),
      danger: Color.lerp(danger, other.danger, t),
      gray: Color.lerp(gray, other.gray, t),
      purple: Color.lerp(purple, purple, t),
      green: Color.lerp(green, other.green, t),
      orange: Color.lerp(orange, other.orange, t),
      yellow: Color.lerp(yellow, other.yellow, t),
      ligthBlue: Color.lerp(ligthBlue, other.ligthBlue, t),
    );
  }
}

final appColors = AppColors(
  primary: const Color(0xff514db6),
  danger: const Color(0xffDC272D),
  gray: const Color(0xffcccccc),
  purple: const Color(0xff7E37C6),
  green: const Color(0xff63C637),
  orange: const Color(0xffFF7F00),
  yellow: const Color(0xffCCA424),
  ligthBlue: const Color(0xfff4f8fa),
);
