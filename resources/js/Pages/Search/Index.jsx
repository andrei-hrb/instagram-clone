import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useRemember } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import { useEffect, useState } from 'react'
import InputLabel from '@/Components/InputLabel'

export default function Index({ auth, errors }) {
    const [query, setQuery] = useRemember('')
    const [results, setResults] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            axios
                .post(route('search.query'), {
                    query: query,
                })
                .then((response) =>
                    setResults(
                        response.data.filter(
                            (result) => result.id !== auth.user.id
                        )
                    )
                )
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }
        >
            <Head title="Search" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <InputLabel value="Search" forInput="search" />
                            <TextInput
                                id="search"
                                name="search"
                                className="w-full mt-1"
                                value={query}
                                handleChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {JSON.stringify(results) === '[]' &&
                                query === '' && (
                                    <h5 className="text-center font-semibold">
                                        Search for users.
                                    </h5>
                                )}
                            {JSON.stringify(results) === '[]' &&
                                query !== '' && (
                                    <h5 className="text-center font-semibold">
                                        No users have been found!
                                    </h5>
                                )}
                            {JSON.stringify(results) !== '[]' &&
                                query !== '' && (
                                    <ul className="flex flex-col space-y-6">
                                        {results.map((result) => (
                                            <li key={result.id}>
                                                <Link
                                                    href={route(
                                                        'profile.show',
                                                        result.id
                                                    )}
                                                    className="hover:underline flex space-x-3 items-center"
                                                >
                                                    <img
                                                        src={
                                                            result.image?.url ??
                                                            '/default.png'
                                                        }
                                                        className="h-24 w-24 rounded-full border-2 object-cover"
                                                        alt={`${result.name}'s Profile Picture`}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">
                                                            {result.name}
                                                        </span>
                                                        <span className="text-sm text-slate-400">
                                                            @{result.username}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
