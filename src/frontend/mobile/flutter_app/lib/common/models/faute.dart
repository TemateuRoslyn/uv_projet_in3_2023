class Faute {
  final String id;
  final String createdAt;
  final String updatedAt;
  final String libelle;
  final String gravite;
  final String regleId;
  final Map<String, dynamic> regle;

  Faute({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    required this.libelle,
    required this.gravite,
    required this.regleId,
    required this.regle,
  });

  factory Faute.fromJson(Map<String, dynamic> json) => Faute(
      id: json['id'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      libelle: json['libelle'],
      gravite: json['gravite'],
      regleId: json['regleId'],
      regle: json['regle']);
}
