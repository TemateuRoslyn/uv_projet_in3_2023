class Regle {
  final int id;
  final String libelle;
  final int reglementInterieurId;
  final String createdAt;
  final String updatedAt;

  Regle({
    required this.id,
    required this.libelle,
    required this.reglementInterieurId,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Regle.fromJson(Map<String, dynamic> json) => Regle(
      id: json['id'],
      libelle: json['libelle'],
      reglementInterieurId: json['reglementInterieurId'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at']);
}
