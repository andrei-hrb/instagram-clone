<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display somebody's profile.
     */
    public function show(User $user): Response
    {
        return Inertia::render('Profile/Show', [
            'user' => $user->load(['posts', 'followers', 'following']),
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $request->user()->name = $validated['name'];
        $request->user()->email = $validated['email'];
        $request->user()->username = $validated['username'];

        if (array_key_exists('image', $validated) && $validated['image'] !== null) {
            if ($request->user()->image()->exists()) {
                $request->user()->image->update([
                    'url' => env('DO_URL').Storage::putFile('instagram/images/avatars', $request->file('image')),
                ]);
            } else {
                $request->user()->image()->create([
                    'url' => env('DO_URL').Storage::putFile('instagram/images/avatars', $request->file('image')),
                    'user_id' => $request->user()->id,
                ]);
            }
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function follow(User $user, Request $request): RedirectResponse
    {
        if ($request->user()->following()->where('following_id', $user->id)->exists()) {
            $request->user()->following()->detach($user->id);
        } else {
            $request->user()->following()->syncWithoutDetaching($user->id);
        }

        return Redirect::route('profile.show', $user->id);
    }
}
