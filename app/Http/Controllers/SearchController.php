<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Show the Search page field.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Search/Index');
    }

    /**
     * Manage Search queries.
     *
     * @param  Request  $request
     *
     * @returns string
     */
    public function query(Request $request): string
    {
        if ($request->has('query') && ! empty($request->input('query', []))) {
            return response()->json(User::search($request->input('query', []))->get(), 200)->getContent();
        }

        return response()->json([], 200)->getContent();
    }
}
