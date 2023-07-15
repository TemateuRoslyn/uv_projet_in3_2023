// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'profile_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$ProfileState {
  User? get currentUser => throw _privateConstructorUsedError;
  ApiStatus get status => throw _privateConstructorUsedError;
  String get statusMessage => throw _privateConstructorUsedError;
  String get textToSpeech => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $ProfileStateCopyWith<ProfileState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProfileStateCopyWith<$Res> {
  factory $ProfileStateCopyWith(
          ProfileState value, $Res Function(ProfileState) then) =
      _$ProfileStateCopyWithImpl<$Res, ProfileState>;
  @useResult
  $Res call(
      {User? currentUser,
      ApiStatus status,
      String statusMessage,
      String textToSpeech});
}

/// @nodoc
class _$ProfileStateCopyWithImpl<$Res, $Val extends ProfileState>
    implements $ProfileStateCopyWith<$Res> {
  _$ProfileStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? currentUser = freezed,
    Object? status = null,
    Object? statusMessage = null,
    Object? textToSpeech = null,
  }) {
    return _then(_value.copyWith(
      currentUser: freezed == currentUser
          ? _value.currentUser
          : currentUser // ignore: cast_nullable_to_non_nullable
              as User?,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ApiStatus,
      statusMessage: null == statusMessage
          ? _value.statusMessage
          : statusMessage // ignore: cast_nullable_to_non_nullable
              as String,
      textToSpeech: null == textToSpeech
          ? _value.textToSpeech
          : textToSpeech // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_InitialCopyWith<$Res>
    implements $ProfileStateCopyWith<$Res> {
  factory _$$_InitialCopyWith(
          _$_Initial value, $Res Function(_$_Initial) then) =
      __$$_InitialCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {User? currentUser,
      ApiStatus status,
      String statusMessage,
      String textToSpeech});
}

/// @nodoc
class __$$_InitialCopyWithImpl<$Res>
    extends _$ProfileStateCopyWithImpl<$Res, _$_Initial>
    implements _$$_InitialCopyWith<$Res> {
  __$$_InitialCopyWithImpl(_$_Initial _value, $Res Function(_$_Initial) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? currentUser = freezed,
    Object? status = null,
    Object? statusMessage = null,
    Object? textToSpeech = null,
  }) {
    return _then(_$_Initial(
      currentUser: freezed == currentUser
          ? _value.currentUser
          : currentUser // ignore: cast_nullable_to_non_nullable
              as User?,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ApiStatus,
      statusMessage: null == statusMessage
          ? _value.statusMessage
          : statusMessage // ignore: cast_nullable_to_non_nullable
              as String,
      textToSpeech: null == textToSpeech
          ? _value.textToSpeech
          : textToSpeech // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_Initial implements _Initial {
  const _$_Initial(
      {this.currentUser = null,
      this.status = ApiStatus.init,
      this.statusMessage = '',
      this.textToSpeech = ''});

  @override
  @JsonKey()
  final User? currentUser;
  @override
  @JsonKey()
  final ApiStatus status;
  @override
  @JsonKey()
  final String statusMessage;
  @override
  @JsonKey()
  final String textToSpeech;

  @override
  String toString() {
    return 'ProfileState(currentUser: $currentUser, status: $status, statusMessage: $statusMessage, textToSpeech: $textToSpeech)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Initial &&
            (identical(other.currentUser, currentUser) ||
                other.currentUser == currentUser) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.statusMessage, statusMessage) ||
                other.statusMessage == statusMessage) &&
            (identical(other.textToSpeech, textToSpeech) ||
                other.textToSpeech == textToSpeech));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, currentUser, status, statusMessage, textToSpeech);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      __$$_InitialCopyWithImpl<_$_Initial>(this, _$identity);
}

abstract class _Initial implements ProfileState {
  const factory _Initial(
      {final User? currentUser,
      final ApiStatus status,
      final String statusMessage,
      final String textToSpeech}) = _$_Initial;

  @override
  User? get currentUser;
  @override
  ApiStatus get status;
  @override
  String get statusMessage;
  @override
  String get textToSpeech;
  @override
  @JsonKey(ignore: true)
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      throw _privateConstructorUsedError;
}
