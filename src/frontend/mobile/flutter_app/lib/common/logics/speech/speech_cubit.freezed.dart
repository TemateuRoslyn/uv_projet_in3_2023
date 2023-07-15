// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'speech_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$SpeechState {
  SpeechType get speechType => throw _privateConstructorUsedError;
  String get textToSpeech => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $SpeechStateCopyWith<SpeechState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SpeechStateCopyWith<$Res> {
  factory $SpeechStateCopyWith(
          SpeechState value, $Res Function(SpeechState) then) =
      _$SpeechStateCopyWithImpl<$Res, SpeechState>;
  @useResult
  $Res call({SpeechType speechType, String textToSpeech});
}

/// @nodoc
class _$SpeechStateCopyWithImpl<$Res, $Val extends SpeechState>
    implements $SpeechStateCopyWith<$Res> {
  _$SpeechStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? speechType = null,
    Object? textToSpeech = null,
  }) {
    return _then(_value.copyWith(
      speechType: null == speechType
          ? _value.speechType
          : speechType // ignore: cast_nullable_to_non_nullable
              as SpeechType,
      textToSpeech: null == textToSpeech
          ? _value.textToSpeech
          : textToSpeech // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_InitialCopyWith<$Res> implements $SpeechStateCopyWith<$Res> {
  factory _$$_InitialCopyWith(
          _$_Initial value, $Res Function(_$_Initial) then) =
      __$$_InitialCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({SpeechType speechType, String textToSpeech});
}

/// @nodoc
class __$$_InitialCopyWithImpl<$Res>
    extends _$SpeechStateCopyWithImpl<$Res, _$_Initial>
    implements _$$_InitialCopyWith<$Res> {
  __$$_InitialCopyWithImpl(_$_Initial _value, $Res Function(_$_Initial) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? speechType = null,
    Object? textToSpeech = null,
  }) {
    return _then(_$_Initial(
      speechType: null == speechType
          ? _value.speechType
          : speechType // ignore: cast_nullable_to_non_nullable
              as SpeechType,
      textToSpeech: null == textToSpeech
          ? _value.textToSpeech
          : textToSpeech // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_Initial implements _Initial {
  const _$_Initial({this.speechType = SpeechType.init, this.textToSpeech = ''});

  @override
  @JsonKey()
  final SpeechType speechType;
  @override
  @JsonKey()
  final String textToSpeech;

  @override
  String toString() {
    return 'SpeechState(speechType: $speechType, textToSpeech: $textToSpeech)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Initial &&
            (identical(other.speechType, speechType) ||
                other.speechType == speechType) &&
            (identical(other.textToSpeech, textToSpeech) ||
                other.textToSpeech == textToSpeech));
  }

  @override
  int get hashCode => Object.hash(runtimeType, speechType, textToSpeech);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      __$$_InitialCopyWithImpl<_$_Initial>(this, _$identity);
}

abstract class _Initial implements SpeechState {
  const factory _Initial(
      {final SpeechType speechType, final String textToSpeech}) = _$_Initial;

  @override
  SpeechType get speechType;
  @override
  String get textToSpeech;
  @override
  @JsonKey(ignore: true)
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      throw _privateConstructorUsedError;
}
