<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ConseilDiscipline;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendEmailJob;
use App\Models\Eleve;
use App\Models\Faute;
use Twilio\Rest\Client;
use Twilio\Exceptions\TwilioException;

class ConseilDisciplineController extends Controller
{

    private $twilioInfo;

    public function __construct()
    {
        $this->twilioInfo = [
            "+237654770063" => ["ACfaf8a483f11bbd6983f6e567732a36c1", "cacd62d64ab0c916c8a63752cab16538", "+18145244457"],
            "+237651779272" => ["ACb3959badcd79d88b411fd167596988ce", "7867db4dfd97896e23032f1ed8eb004b", "+15418593377"],
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/conseil_discipline/findAll",
     *     summary="Get all disciplinary councils",
     *     description="Retrieve a list of all disciplinary councils with associated eleve",
     *     operationId="conseilDisciplinesIndex",
     *     tags={"ConseilDisciplines"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             example="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary councils retrieved successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/ConseilDiscipline"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */

    public function index()
    {
        $conseil_discipline = ConseilDiscipline::with('eleve.classe', 'faute.regle.reglementInterieur')->has('eleve')->get();

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary councils retrieved successfully',
            'content' => $conseil_discipline,
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/conseil_discipline/findOne/{id}",
     *     summary="Get disciplinary council information",
     *     description="Get information about a specific disciplinary council",
     *     operationId="viewConseilDiscipline",
     *     tags={"ConseilDisciplines"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of disciplinary council to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="conseil de discipline trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ConseilDiscipline")
     *         )
     *     )
     * )
     */

    public function view($conseil_disciplineId)
    {
        $conseil_discipline = ConseilDiscipline::with('eleve.classe', 'faute.regle.reglementInterieur')->find($conseil_disciplineId);

        if (!$conseil_discipline) {
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council retrieved successfully',
            'content' => $conseil_discipline
        ], 200);
    }


    /**
     * @OA\Get(
     *     path="/api/conseil_discipline/findAll/eleve/{eleveId}",
     *     summary="Get conseil_discipline information for a student",
     *     description="Get information about all specific conseil_discipline to a student",
     *     operationId="viewConseilDisciplineEleve",
     *     tags={"ConseilDisciplines"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="eleveId",
     *         in="path",
     *         description="ID of Eleve to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *               @OA\Property(property="message", type="string", example="conseil_discipline de l\'eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="conseil_discipline de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ConseilDiscipline")
     *         )
     *     )
     * )
     */
    public function viewConseilDisciplineEleve($eleveId)
    {

        $conseildiscipline = ConseilDiscipline::where('eleveId', $eleveId)->with(['eleve', 'faute.regle.reglementInterieur'])->get();


        if ($conseildiscipline) {
            return response()->json([
                'message' => 'conseil_discipline de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $conseildiscipline
            ], 200);
        } else {
            return response()->json([
                'message' => 'conseil_discipline de l\'eleve non trouvée',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/conseil_discipline/create",
     *     summary="Create a new disciplinary council",
     *     description="Create a new disciplinary council resource",
     *     operationId="createConseilDiscipline",
     *     tags={"ConseilDisciplines"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *      ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"dateCd", "heureDebutCd", "heureFinCd", "eleveId","fauteId"},
     *                 @OA\Property(property="dateCd", type="string", format="date", example="2023-06-05"),
     *                 @OA\Property(property="heureDebutCd", type="string", example="09:00:00"),
     *                 @OA\Property(property="heureFinCd", type="string", example="10:00:00"),
     *                 @OA\Property(property="eleveId", type="integer", example=1),
     *                 @OA\Property(property="fauteId", type="integer", example=1)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Could not create this Disciplinary council"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "dateCd": {
     *                     "The dateCd field is required."
     *                 },
     *                 "heureDebutCd": {
     *                     "The heureDebutCd field is required."
     *                 },
     *                 "heureFinCd": {
     *                     "The heureFinCd field is required."
     *                 },
     *                 "eleveId": {
     *                     "The eleveId field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/ConseilDiscipline")
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dateCd' => 'required|date|after:' . Carbon::now(),
            'heureDebutCd' => 'required|date_format:H:i',
            'heureFinCd' => 'required|date_format:H:i|after:heureDebutCd',
            'eleveId' => 'required|integer|exists:eleves,id',
            'fauteId' => 'required|integer|exists:fautes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this Disciplinary council',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $debut = Carbon::parse($request->input('dateCd') . ' ' . $request->input('heureDebutCd'));
        $fin = Carbon::parse($request->input('dateCd') . ' ' . $request->input('heureFinCd'));

        $conseil_discipline = new ConseilDiscipline();
        $conseil_discipline->dateCd = $request->input('dateCd');
        $conseil_discipline->heureDebutCd = $request->input('heureDebutCd');
        $conseil_discipline->heureFinCd = $request->input('heureFinCd');
        $conseil_discipline->eleveId = $request->input('eleveId');
        $conseil_discipline->fauteId = $request->input('fauteId');
        $conseil_discipline->status = $conseil_discipline->getStatusAttribute();
        $conseil_discipline->save();
        //Information sur l'eleve qui assiste au conseil de discipline
        $conseil_discipline->load('eleve', 'faute.regle.reglementInterieur');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;
        $faute = Faute::with('regle.reglementInterieur')->find($request->fauteId);

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez ete traduit au conseil de discipline ( $faute->libelle ) car vous avez gravement enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details du conseil de discipline";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a ete traduit au conseil de discipline ( $faute->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details du conseil de discipline";
            $detailsP['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
            $detailsP['endtext'] = "Merci de rester fidele à cet etablissement";

            // envoi du mail
            Queue::push(new SendEmailJob($parent->user, $detailsP));

            //Envoie du sms
            if (array_key_exists($parent->telephone, $this->twilioInfo)) {
                $valeurs = $this->twilioInfo[$parent->telephone];

                $twilioSid = $valeurs[0];
                $twilioToken = $valeurs[1];
                $twilioPhoneNumber = $valeurs[2];

                $phoneNumber = $parent->telephone;

                try {
                    $twilio = new Client($twilioSid, $twilioToken);

                    // Vérifier si le numéro de téléphone est valide
                    $twilio->lookups->v1->phoneNumbers($phoneNumber)->fetch();

                    // Si aucune exception n'est levée, le numéro est valide, envoyer le message
                    $message = $twilio->messages->create(
                        $phoneNumber,
                        [
                            'from' => $twilioPhoneNumber,
                            'body' => $detailsP['body']
                        ]
                    );


                } catch (TwilioException $e) {
                    // return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'envoi du message : ' . $e->getMessage());
                }
            }

            $detailsP = array();
        }

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council created successfully',
            'content' => $conseil_discipline
        ], 200);
    }

    /**
     * @OA\post(
     *     path="/api/conseil_discipline/update/{conseilDisciplineId}",
     *     summary="Update a disciplinary council's information",
     *     description="Update a disciplinary council's information",
     *     operationId="updateConseilDiscipline",
     *     tags={"ConseilDisciplines"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"dateCd", "heureDebutCd", "heureFinCd", "eleveId","fauteId"},
     *             @OA\Property(property="dateCd", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="heureDebutCd", type="string", example="09:00:00"),
     *             @OA\Property(property="heureFinCd", type="string", example="11:00:00"),
     *             @OA\Property(property="eleveId", type="integer", example=1),
     *             @OA\Property(property="fauteId", type="integer", example=1)
     *           )
     *     ),
     * @OA\Parameter(
     *         name="conseilDisciplineId",
     *         in="path",
     *         description="ID of eleve to update in this request",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="object", example={
     *                 "dateCd": {
     *                     "The dateCd field is required."
     *                 },
     *                 "heureDebutCd": {
     *                     "The heureDebutCd field is required."
     *                 },
     *                 "heureFinCd": {
     *                     "The heureFinCd field is required."
     *                 },
     *                 "eleveId": {
     *                     "The eleveId field is required."
     *                 }
     *             })
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council updated successfully"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/ConseilDiscipline"),
     *         )
     *     )
     * )
     */

    public function update(Request $request, $id)
    {
        $conseil_discipline = ConseilDiscipline::find($id);
        if ($conseil_discipline) {
            $validator = Validator::make($request->all(), [
                'dateCd' => 'required|date',
                'heureDebutCd' => 'required|date_format:H:i:s',
                'heureFinCd' => 'required|date_format:H:i:s|after:heureDebutCd',
                'eleveId' => 'required|integer|exists:eleves,id',
                'fauteId' => 'required|integer:exists:fautes,id',
            ]);
        } else {
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid',
                'error' => $validator->errors(),
                'success' => false
            ], 400);
        }


        $debut = Carbon::parse($request->input('dateCd') . ' ' . $request->input('heureDebutCd'));
        $fin = Carbon::parse($request->input('dateCd') . ' ' . $request->input('heureFinCd'));

        //mise a jour des informations du conseil de discipline
        $conseil_discipline->dateCd = $request->input('dateCd');
        $conseil_discipline->heureDebutCd = $request->input('heureDebutCd');
        $conseil_discipline->heureFinCd = $request->input('heureFinCd');
        $conseil_discipline->eleveId = $request->input('eleveId');
        $conseil_discipline->fauteId = $request->input('fauteId');
        $conseil_discipline->status = $conseil_discipline->getStatusAttribute();
        $conseil_discipline->save();

        //Information sur l'eleve qui assiste au conseil de discipline
        $conseil_discipline->load('eleve', 'faute.regle.reglementInterieur');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;
        $faute = Faute::with('regle.reglementInterieur')->find($request->fauteId);

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez ete traduit au conseil de discipline ( $faute->libelle ) car vous avez gravement enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details du conseil de discipline";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a ete traduit au conseil de discipline ( $faute->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details du conseil de discipline";
            $detailsP['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
            $detailsP['endtext'] = "Merci de rester fidele à cet etablissement";

            // envoi du mail
            Queue::push(new SendEmailJob($parent->user, $detailsP));

            //Envoie du sms
            if (array_key_exists($parent->telephone, $this->twilioInfo)) {
                $valeurs = $this->twilioInfo[$parent->telephone];

                $twilioSid = $valeurs[0];
                $twilioToken = $valeurs[1];
                $twilioPhoneNumber = $valeurs[2];

                $phoneNumber = $parent->telephone;

                try {
                    $twilio = new Client($twilioSid, $twilioToken);

                    // Vérifier si le numéro de téléphone est valide
                    $twilio->lookups->v1->phoneNumbers($phoneNumber)->fetch();

                    // Si aucune exception n'est levée, le numéro est valide, envoyer le message
                    $message = $twilio->messages->create(
                        $phoneNumber,
                        [
                            'from' => $twilioPhoneNumber,
                            'body' => $detailsP['body']
                        ]
                    );


                } catch (TwilioException $e) {
                    // return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'envoi du message : ' . $e->getMessage());
                }
            }

            $detailsP = array();
        }

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council updated successfully',
            'content' => $conseil_discipline
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/conseil_discipline/delete/{id}",
     *     summary="Delete a disciplinary council",
     *     description="Delete a disciplinary council resource",
     *     operationId="deleteConseilDiscipline",
     *     tags={"ConseilDisciplines"},
     *     @OA\Parameter(
     *         name="Authorization",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="Bearer {your_token}"
     *         ),
     *         description="JWT token"
     *     ),
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of disciplinary council to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error - Not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="string", example="Disciplinary council not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Disciplinary council deleted successfully"),
     *         )
     *     )
     * )
     */

    public function delete(string $id)
    {
        $conseil_discipline = ConseilDiscipline::find($id);

        if (!$conseil_discipline) {
            return response()->json([
                'error' => 'Disciplinary council not found',
                'success' => false
            ], 404);
        }

        // $conseil_discipline->eleve()->detach();
        $conseil_discipline->delete();

        return response()->json([
            'success' => true,
            'message' => 'Disciplinary council deleted successfully'
        ], 200);
    }
}
