<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class OtherController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/contact",
     *     summary="Create us",
     *     description="Contact us by send mail",
     *     operationId="sendMailContact",
     *     tags={"Contact"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *           required={"nom", "email", "objet", "message"},
     *             @OA\Property(property="nom", type="string", format="text", example="Djouko Hercule Socrate"),
     *             @OA\Property(property="email", type="string", format="email", example="destructeurkratos@gmail.com"),
     *             @OA\Property(property="objet", type="string", format="text", example="Remerciements"),
     *             @OA\Property(property="message", type="string", format="text", example="Je vous remercie enormement pour votre solution proposee, elle m'aide beaucoup.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error - Invalid request data",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid"),
     *             @OA\Property(property="errors", type="object", example={
     *                 "nom": {
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
     *             @OA\Property(property="message", type="string", example="email send successfully"),
     *         )
     *     )
     * )
     */
    public function contact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'email' => 'required|email',
            'objet' => 'required|string',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Could not send email',
                'success' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $user = User::find(3);

        //envoie du mail a l'eleve
        $details = array();

        $details['greeting'] = "Hi, my name is " . $request->nom;
        $details['body'] = $request->message;
        $details['actiontext'] = $request->objet;
        $details['actionurl'] = $request->email;
        $details['endtext'] = "Merci de rester fidele à cet etablissement";

        // envoi du mail
        Queue::push(new SendEmailJob($user, $details));

        return response()->json([
            'message' => 'email send successfully',
            'success' => true,
        ], 200);
    }
}
