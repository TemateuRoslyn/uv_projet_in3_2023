import 'faute.dart';

class ConseilDiscipline {
  final int id;
  final String dateCd;
  final String heureDebutCd;
  final String heureFinCd;
  final Faute faute;
  final String createdAt;
  final String updatedAt;

  ConseilDiscipline({
    required this.id,
    required this.dateCd,
    required this.heureDebutCd,
    required this.heureFinCd,
    required this.faute,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ConseilDiscipline.fromJson(Map<String, dynamic> json) =>
      ConseilDiscipline(
        id: json['id'],
        dateCd: json['dateCd'],
        heureDebutCd: json['heureDebutCd'],
        heureFinCd: json['heureFinCd'],
        faute: Faute.fromJson(json['faute']),
        createdAt: json['created_at'],
        updatedAt: json['updated_at'],
      );
}
