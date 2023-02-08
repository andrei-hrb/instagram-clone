<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_create_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/posts/create');

        $response->assertOk();
    }

    public function test_post_store(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/posts/', [
                'description' => 'lorem ipsum',
                'image' => UploadedFile::fake()->image('image.jpg'),
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/posts/create');

        $post = Post::latest()->first();

        $this->assertEquals('lorem ipsum', $post->description);
        $this->assertFileExists(str_replace('storage', storage_path('app/public/'), $post->image));
    }
}
