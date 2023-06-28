// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'home_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$HomeState {
  ApiStatus get riStatus => throw _privateConstructorUsedError;
  List<ReglementInterieur> get ri => throw _privateConstructorUsedError;
  String get riStatusMessage => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $HomeStateCopyWith<HomeState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HomeStateCopyWith<$Res> {
  factory $HomeStateCopyWith(HomeState value, $Res Function(HomeState) then) =
      _$HomeStateCopyWithImpl<$Res, HomeState>;
  @useResult
  $Res call(
      {ApiStatus riStatus,
      List<ReglementInterieur> ri,
      String riStatusMessage});
}

/// @nodoc
class _$HomeStateCopyWithImpl<$Res, $Val extends HomeState>
    implements $HomeStateCopyWith<$Res> {
  _$HomeStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? riStatus = null,
    Object? ri = null,
    Object? riStatusMessage = null,
  }) {
    return _then(_value.copyWith(
      riStatus: null == riStatus
          ? _value.riStatus
          : riStatus // ignore: cast_nullable_to_non_nullable
              as ApiStatus,
      ri: null == ri
          ? _value.ri
          : ri // ignore: cast_nullable_to_non_nullable
              as List<ReglementInterieur>,
      riStatusMessage: null == riStatusMessage
          ? _value.riStatusMessage
          : riStatusMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_InitialCopyWith<$Res> implements $HomeStateCopyWith<$Res> {
  factory _$$_InitialCopyWith(
          _$_Initial value, $Res Function(_$_Initial) then) =
      __$$_InitialCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {ApiStatus riStatus,
      List<ReglementInterieur> ri,
      String riStatusMessage});
}

/// @nodoc
class __$$_InitialCopyWithImpl<$Res>
    extends _$HomeStateCopyWithImpl<$Res, _$_Initial>
    implements _$$_InitialCopyWith<$Res> {
  __$$_InitialCopyWithImpl(_$_Initial _value, $Res Function(_$_Initial) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? riStatus = null,
    Object? ri = null,
    Object? riStatusMessage = null,
  }) {
    return _then(_$_Initial(
      riStatus: null == riStatus
          ? _value.riStatus
          : riStatus // ignore: cast_nullable_to_non_nullable
              as ApiStatus,
      ri: null == ri
          ? _value._ri
          : ri // ignore: cast_nullable_to_non_nullable
              as List<ReglementInterieur>,
      riStatusMessage: null == riStatusMessage
          ? _value.riStatusMessage
          : riStatusMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_Initial implements _Initial {
  const _$_Initial(
      {this.riStatus = ApiStatus.init,
      final List<ReglementInterieur> ri = const [],
      this.riStatusMessage = ''})
      : _ri = ri;

  @override
  @JsonKey()
  final ApiStatus riStatus;
  final List<ReglementInterieur> _ri;
  @override
  @JsonKey()
  List<ReglementInterieur> get ri {
    if (_ri is EqualUnmodifiableListView) return _ri;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_ri);
  }

  @override
  @JsonKey()
  final String riStatusMessage;

  @override
  String toString() {
    return 'HomeState(riStatus: $riStatus, ri: $ri, riStatusMessage: $riStatusMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Initial &&
            (identical(other.riStatus, riStatus) ||
                other.riStatus == riStatus) &&
            const DeepCollectionEquality().equals(other._ri, _ri) &&
            (identical(other.riStatusMessage, riStatusMessage) ||
                other.riStatusMessage == riStatusMessage));
  }

  @override
  int get hashCode => Object.hash(runtimeType, riStatus,
      const DeepCollectionEquality().hash(_ri), riStatusMessage);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      __$$_InitialCopyWithImpl<_$_Initial>(this, _$identity);
}

abstract class _Initial implements HomeState {
  const factory _Initial(
      {final ApiStatus riStatus,
      final List<ReglementInterieur> ri,
      final String riStatusMessage}) = _$_Initial;

  @override
  ApiStatus get riStatus;
  @override
  List<ReglementInterieur> get ri;
  @override
  String get riStatusMessage;
  @override
  @JsonKey(ignore: true)
  _$$_InitialCopyWith<_$_Initial> get copyWith =>
      throw _privateConstructorUsedError;
}
