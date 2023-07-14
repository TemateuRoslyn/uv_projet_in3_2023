<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Eleve;
use App\Models\Regle;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Faute;
use App\Models\User;
use App\Models\Role;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendEmailJob;
use Twilio\Rest\Client;
use Twilio\Exceptions\TwilioException;

class FauteController extends Controller
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
     *     path="/api/fautes/findAll",
     *     summary="Find all mistakes",
     *     description="Retrieve a list of all mistakes with associated eleves and regles",
     *     operationId="indexFautes",
     *     tags={"Fautes"},
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
     *  security={{"bearerAuth":{}}},
     *     tags={"Fautes"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Liste des fautes"),
     *             @OA\Property(property="content", type="array", @OA\Items(ref="#/components/schemas/Faute")
     *         )
     *         )
     *     ),
     *     @OA\Response(
     *         response=300,
     *         description="Error - Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthorized")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $fautes = Faute::with('regle.reglementInterieur', 'eleve.user')->get();

        return response()->json([
            'message' => 'Liste des fautes',
            'success' => true,
            'content' => $fautes
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/fautes/findOne/{id}",
     *     summary="Get mistake information",
     *     description="Get information about a specific mistake",
     *     operationId="viewFaute",
     *     tags={"Fautes"},
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
     *         description="ID of Faute to get information for",
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
     *               @OA\Property(property="message", type="string", example="Faute not found"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Faute trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Faute")
     *         )
     *     )
     * )
     */
    public function view($fauteId)
    {

        $faute = Faute::with(['eleve.user', 'regle.reglementInterieur'])->find($fauteId);


        if ($faute) {
            return response()->json([
                'message' => 'faute trouvé(e)',
                'success' => true,
                'content' => $faute
            ], 200);
        } else {
            return response()->json([
                'message' => 'faute non trouvée',
                'success' => false,
            ], 404);
        }
    }


    /**
     * @OA\Get(
     *     path="/api/fautes/findAll/eleve/{eleveId}",
     *     summary="Get mistake information for a student",
     *     description="Get information about all specific mistake to a student",
     *     operationId="viewFauteEleve",
     *     tags={"Fautes"},
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
     *               @OA\Property(property="message", type="string", example="eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="fautes de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Faute")
     *         )
     *     )
     * )
     */
    public function viewFautesEleve($eleveId)
    {
        $eleve = Faute::where('eleveId', '=', $eleveId)->with('regle.reglementInterieur')->get();

        if ($eleve) {
            return response()->json([
                'message' => 'fautes de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $eleve
            ], 200);
        } else {
            return response()->json([
                'message' => 'eleve non trouvée',
                'success' => false,
            ], 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/fautes/findAll/eleve/voice/{eleveId}",
     *     summary="Get mistake information for a student to voice",
     *     description="Get information about all specific mistake to a student to voice",
     *     operationId="viewFauteVoiceEleve",
     *     tags={"Fautes"},
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
     *               @OA\Property(property="message", type="string", example="eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="fautes de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object")
     *         )
     *     )
     * )
     */
    public function viewFautesVoiceEleve($eleveId)
    {

        $eleve = Eleve::find($eleveId);


        if ($eleve) {
            // Récupérer les fautes de l'élève
            $fautes = Faute::where('eleveId', $eleve->id)->get();

            // Compter le nombre de fautes
            $nombreFautes = $fautes->count();

            $nbFautes = count($fautes);
            if($nombreFautes == 0)
            {
                $message = "L'élève " . $eleve->firstName . $eleve->lastName . " n'a commis aucune faute";
            }else{
                $message = "L'élève " . $eleve->firstName . $eleve->lastName . " a commis " . $nombreFautes ." fautes qui sont les suivantes : ";

                foreach ($fautes as $faute) {
                    $message .= $faute->libelle . ", ";
                }

                $message = rtrim($message, ', '); // Supprimer la virgule finale
            }
            // Créer l'objet avec le message et le nombre de fautes
            $voiceFautes = [
                'message' => $message,
                'nombreFautes' => $nombreFautes,
            ];
            return response()->json([
                'message' => 'fautes de l\'eleve trouvé(e)',
                'success' => true,
                'content' => $voiceFautes
            ], 200);
        } else {
            return response()->json([
                'message' => 'eleve non trouvée',
                'success' => false,
            ], 404);
        }
    }



    /**
     * @OA\Get(
     *     path="/api/fautes/recordsFautesEleve/{eleveId}/{keyword}",
     *     summary="Get mistake information for a student",
     *     description="Get information about all specific mistake to a student",
     *     operationId="viewFauteEleveAndKeyword",
     *     tags={"Fautes"},
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
     *         description="ID of Eleve to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *      @OA\Parameter(
     *         name="keyword",
     *         in="path",
     *         description="Keyword to get information for",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
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
     *               @OA\Property(property="message", type="string", example="fautes de l\'eleve non trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="false"),
     *
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="fautes de l\'eleve trouvé(e)"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="array", @OA\Items(type="string", example="libelle :5")),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Faute")
     *         )
     *     )
     * )
     */
    public function recordsFautesEleve($eleveId, $keyword)
    {
        //dd($request);

        $fautes = Faute::where('eleveId', '=', $eleveId)
        ->where('libelle', 'like', "%{$keyword}%")
        ->with(['eleve', 'regle.reglementInterieur'])->get();
        //dd($keyword);
        $formattedFaute = $fautes->map(function ($faute) {
            $name = $faute->libelle;
            $id = $faute->id;
            return "{$name} :{$id}";
        });
        //sdd($formattedFaute, $fautes);

        return response()->json([
            'message' => 'fautes de l\'eleve trouvé(e)',
            'success' => true,
            'content' => $formattedFaute,
            'data' => $fautes
        ], 200);
        /* } else {
            return response()->json([
                'message' => 'fautes de l\'eleve non trouvée',
                'success' => false,
            ], 404);
         }*/
    }

    /**
     * @OA\Post(
     *     path="/api/fautes/create",
     *     summary="Create a new Mistake",
     *     description="Create a new Mistake resource",
     *     operationId="createMistake",
     *     tags={"Fautes"},
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
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *           required={"libelle", "gravite", "eleveId", "regleId"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Etre sorti sans avoir eu la permission"),
     *             @OA\Property(property="gravite", type="string", format="text", example="grave avec recessivite"),
     *             @OA\Property(property="eleveId", type="integer", example=2),
     *             @OA\Property(property="regleId", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example={
     *                 "libelle": {
     *                     "The libelle field is required."
     *                 }
     *             }),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Faute created successfully"),
     *             @OA\Property(property="content", ref="#/components/schemas/Faute")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'gravite' => 'required|string',
            'eleveId' => [
                'required',
                'integer',
                Rule::exists('eleves', 'id')->where(function ($query) use ($request) {
                    $query->where('id', $request->eleveId);
                })
            ],
            'regleId' => [
                'required',
                'integer',
                Rule::exists('regles', 'id')->where(function ($query) use ($request) {
                    $query->where('id', $request->regleId);
                })
            ],


        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not create this mistake',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $fautte = Faute::create([
            'eleveId' => $request->input('eleveId'),
            'regleId' => $request->input('regleId'),
            'libelle' => $request->input('libelle'),
            'gravite' => $request->input('gravite'),
        ]);
        $fautte->load('eleve.user', 'regle.reglementInterieur');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez commis une faute ( $fautte->libelle ) car vous avez enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details de la Faute";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant " . $eleve->firstName . $eleve->lastName . " a commis une faute ( $fautte->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details de la Faute";
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
            'message' => 'Mistake created successfully',
            'success' => true,
            'content' => $fautte
        ], 200);
    }
    /**
     * @OA\post(
     *     path="/api/fautes/update/{fauteId}",
     *     summary="Update a mistake's information",
     *     description="Update a mistake's information",
     *     operationId="updateMistake",
     *     tags={"Fautes"},
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
     *         name="fauteId",
     *         in="path",
     *         description="ID of mistake to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              required={"libelle","gravite","eleveId","regleId"},
     *             @OA\Property(property="libelle", type="string", format="text", example="Etre assidue"),
     *             @OA\Property(property="gravite", type="string", format="text",  example="grave"),
     *             @OA\Property(property="eleveId", type="integer", example=1),
     *             @OA\Property(property="regleId", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="object", example={
     *                "libelle": {
     *                     "The libelle field is required."
     *                 }
     *             })
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
     *             @OA\Property(property="error", type="string", example="mistake not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Faute modifié avec succèss"),
     *             @OA\Property(property="success", type="boolean", example="true"),
     *             @OA\Property(property="content", type="object", ref="#/components/schemas/Faute"),
     *         )
     *     )
     * )
     */

    public function update(Request $request, $fauteId)
    {
        // on récupère la faute associé
        $fauteFound = Faute::find($fauteId);
        if ($fauteFound) {

            $validator = Validator::make($request->all(), [
                'libelle' => 'required|string|max:255',
                'gravite' => 'required|string',
                'eleveId' => [
                    'required',
                    'integer',
                    Rule::exists('eleves', 'id')->where(function ($query) use ($request) {
                        $query->where('id', $request->eleveId);
                    })
                ],
                'regleId' => [
                    'required',
                    'integer',
                    Rule::exists('regles', 'id')->where(function ($query) use ($request) {
                        $query->where('id', $request->regleId);
                    })
                ],
            ]);
        } else {
            return response()->json([
                'message' => 'Faute not exists',
                'success' => false,
            ], 404);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not update this course',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }


        // Mise à jour des champs de l'objet faute
        $fauteFound->libelle = $request->input('libelle');
        $fauteFound->gravite = $request->input('gravite');
        $fauteFound->eleveId = $request->input('eleveId');
        $fauteFound->regleId = $request->input('regleId');
        $fauteFound->save();
        $fauteFound->load('eleve.user', 'regle.reglementInterieur');

        $eleve = Eleve::find($request->eleveId);
        $parents = $eleve->parents;

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi " . $eleve->firstName;
        $details['body'] = "Vous avez commis une faute ( $fauteFound->libelle ) car vous avez enfrein une une des regles de l'etablissement .
                            \n
                            \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de vous des Hommes de demain, vous devez connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
        $details['actiontext'] = "Details de la Faute";
        $details['actionurl'] = "https://react-admin-ashy-zeta.vercel.app/";
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($eleve->user, $details));

        //envoie du mail aux parents
        foreach ($parents as $parent) {
            $detailsP = array();

            $detailsP['greeting'] = "Hi " . $parent->firstName;
            $detailsP['body'] = "Votre enfant nomme " . $eleve->firstName . $eleve->lastName . " a commis une faute ( $fauteFound->libelle ) car il/elle a enfrein une une des regles de l'etablissement .
                                \n
                                \n  Cet etablissement est un lieu d'apprentissage, ou doit reigner le travail et la discipline. Pour nous aider a faire de votre enfant un Homme ( une Femme ) de demain, vous devez veiller a la bonne education de votre enfant et de lui faire connaitre et respecter les regles et reglements interieurs de l'etablissement renseignes sur la plateforme .";
            $detailsP['actiontext'] = "Details de la Faute";
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
            'message' => 'Mistake updated successfully',
            'success' => true,
            'content' => $fauteFound
        ], 200);
    }

    /**
     * @OA\Delete (
     *     path="/api/fautes/delete/{id}",
     *     summary="Delete a mistake",
     *     description="Delete a mistake resource",
     *     operationId="deleteMistake",
     *     tags={"Fautes"},
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
     *         description="ID of mistake to delete",
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
     *             @OA\Property(property="error", type="string", example="Mistake not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *        @OA\JsonContent(
     *             type="object",
     *                type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Faute deleted successfully")
     *     )
     * )
     * )
     */
    public function delete($fauteId)
    {
        $faute = Faute::find($fauteId);

        if (!$faute) {
            return response()->json([
                'message' => 'Mistake not found',
                'success' => false
            ], 404);
        } else {

            $faute->delete();

            return response()->json([
                'success' => true,
                'message' => 'Mistake deleted successfully'
            ], 200);
        }
    }
    /**
     * Get the filtered list of Faults.
     *
     * @OA\Get(
     *     path="/api/fautes/records/{keyword}",
     *     summary="Get filtered list of faults",
     *     tags={"Fautes"},
     *     operationId="fautesRecords",
     *     @OA\Parameter(
     *         name="keyword",
     *         in="path",
     *         description="Keyword to filter faults",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
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
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Faults records successfully"),
     *             @OA\Property(property="content", type="array", @OA\Items(type="string", example="Bavardage"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid request",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Invalid request"),
     *             @OA\Property(property="success", type="boolean", example=false)
     *         )
     *     )
     * )
     */
    public function records($keyword)
    {
        $fautes = Faute::where('libelle', 'like', "%{$keyword}%")
            ->get();

        // dd($fautes);

        $formattedFaute = $fautes->map(function ($faute) {
            $libelle = $faute->libelle;
            $gravite = $faute->gravite;
            $id = $faute->id;

            return "{$libelle} {$gravite}:{$id}";
        });

        return response()->json([
            'success' => true,
            'message' => 'Faute records successfully',
            'content' => $formattedFaute,
        ], 200);
    }
}
