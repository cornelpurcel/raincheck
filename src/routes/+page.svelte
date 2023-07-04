<script lang="ts">
	import { onMount } from 'svelte';

	type City = {
		city: string;
		admin_name: string;
		city_ascii: string;
		country: string;
		iso2: string;
		iso3: string;
		lat: number;
		lng: number;
	};

	type PrecipitationResults = {
		dates: Date[];
		values: number[];
	};

	async function getAllCities(): Promise<City[]> {
		const res = await fetch('./worldcities.json');
		const cities: City[] = await res.json();
		return cities.sort((a: City, b: City) =>
			a.city_ascii < b.city_ascii ? -1 : a.city_ascii > b.city_ascii ? 1 : 0
		);
	}
	// whether component is mounted
	let mounted = false;
	// whether list(drop down) is open
	let listActive = false;

	// how many entries should be shown at a time
	const entriesAtATime = 7;

	// what user inputs in the text box
	let userCityInput: string = '';
	// all cities loaded from the .json file
	let allCities: City[] = [];
	// city that has been clicked/chosen by the user

	let finalChoice: City;
	// startIndex and endIndex control which cities are shown in the drop down
	let startIndex = 0;
	let endIndex = entriesAtATime;

	// results string saying how long ago the last rain was
	let resultString = 'search for a city to find out when it last rained';

	// number of days to look in the past
	const pastDays = 61;

	// which entry is focused by keyboard
	let selectedEntryIndex = -1;
	// the whole autocomplete form:
	let autocompleteForm: HTMLElement;

	$: filteredCities = allCities.filter((city) =>
		city.city_ascii.toLowerCase().startsWith(userCityInput.toLowerCase())
	);
	$: filteredCitiesWindow = filteredCities.slice(startIndex, endIndex);
	$: filteredCitiesLength = filteredCities.length;
	$: listOpen = mounted && filteredCitiesWindow.length > 0 && listActive;

	onMount(async () => {
		allCities = await getAllCities();
		mounted = true;
	});

	const chooseCity = async (city: City) => {
		finalChoice = city;
		userCityInput = city.city_ascii;
		unfocusAutocomplete();
		await calculateResults();
	};

	// unfocuses the autocomplete text box
	const unfocusAutocomplete = () => {
		selectedEntryIndex = -1;
		listActive = false;
		document.getElementById('city-select')?.blur();
		document.getElementById('user-chose')?.focus();
	};

	const handleFocus = () => {
		listActive = true;
	};

	// returns emoji for country code
	function getFlagEmoji(countryCode: string) {
		const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}

	// returns nicely formatted city string with emoji and region
	const getCityString = (city: City) => {
		if (city) return `${getFlagEmoji(city.iso2)} ${city.city}, ${city.admin_name}`;
		return '';
	};

	// gets data from API about precipitation in city
	const getResults = async (city: City): Promise<PrecipitationResults> => {
		const lat = city.lat;
		const long = city.lng;
		const dataEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=precipitation_sum&timezone=GMT&past_days=${pastDays}&forecast_days=1`;
		const response = await fetch(dataEndpoint, { cache: 'default' });
		const data = await response.json();
		console.log(data);
		const parsedDates = data.daily.time.map((val: string) => new Date(val));
		return {
			values: data.daily.precipitation_sum,
			dates: parsedDates
		};
	};

	// returns date of latest precipitation
	const getLatestPrecipitationDate = (precipitations: PrecipitationResults) => {
		for (let i = precipitations.values.length - 1; i > 0; i--) {
			if (precipitations.values[i] > 0) {
				return precipitations.dates[i];
			}
		}
		return null;
	};

	// formats the result string
	const getResultString = (latestPrecipitation: Date | undefined | null, city: string) => {
		if (!latestPrecipitation) {
			return "It hasn't rained for more than 2 months...";
		}
		const today = new Date();
		const diffMilliseconds = today.valueOf() - latestPrecipitation.valueOf();
		const diffDays = Math.floor(diffMilliseconds / 1000 / 60 / 60 / 24);

		if (diffDays === 0) {
			return `Looks like ${city} got rain today! 🥳`;
		}
		if (diffDays === 1) {
			return `Looks like it has rained yesterday in ${city}! 🌳`;
		}
		if (diffDays < 7) {
			return `Looks like ${city} has got some rain in the past week! 🍃`;
		}
		return `Looks like it has been ${diffDays} days since the last rain in ${city} 🥵`;
	};

	const calculateResults = async () => {
		const precipitations = await getResults(finalChoice);
		const latestPrecipitation = getLatestPrecipitationDate(precipitations);

		resultString = getResultString(latestPrecipitation, finalChoice.city);
	};

	const handleGlobalClick = (event: MouseEvent) => {
		const isClickInsideList = autocompleteForm?.contains(event.target as Node) ?? false;
		if (!isClickInsideList) {
			listActive = false;
		}
	};

	const handleInputKeys = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			unfocusAutocomplete();
		} else if (event.key === 'ArrowDown') {
			const visibleEntries = Math.min(entriesAtATime, filteredCitiesLength);
			selectedEntryIndex += 1;
			selectedEntryIndex =
				selectedEntryIndex >= visibleEntries ? visibleEntries - 1 : selectedEntryIndex;
		} else if (event.key === 'ArrowUp') {
			selectedEntryIndex -= 1;
			selectedEntryIndex = selectedEntryIndex < -1 ? -1 : selectedEntryIndex;
		} else if (event.key === 'Enter') {
			selectedEntryIndex = 0;
			chooseCity(filteredCitiesWindow[selectedEntryIndex]);
		}
	};

	const handleSubmit = () => {
		console.log('submitted city:', finalChoice);
	};
</script>

<svelte:document on:click={handleGlobalClick} />
<h1>welcome to raincheck</h1>

<form bind:this={autocompleteForm} id="autocomplete-form" on:submit|preventDefault={handleSubmit}>
	<div class="autocomplete stack">
		<input
			autocomplete="off"
			type="text"
			placeholder="search city"
			id="city-select"
			on:keydown={handleInputKeys}
			on:focus={handleFocus}
			on:change={() => {
				startIndex = 0;
				endIndex = entriesAtATime;
			}}
			bind:value={userCityInput}
		/>
	</div>

	{#if listOpen}
		<ul id="autocomplete-items-list">
			{#each filteredCitiesWindow as city, index}
				<li
					class="autocomplete-items"
					class:selected={index === selectedEntryIndex}
					on:click={() => chooseCity(city)}
					on:keydown={(e) => e.code === 'Enter' && chooseCity(city)}
				>
					{getCityString(city)}
				</li>
			{/each}
		</ul>
	{/if}
</form>
{#if finalChoice}
	<div class="stack">
		<p>{getCityString(finalChoice)}</p>
	</div>
{/if}
{#if resultString}
	<div class="stack">
		<span>{resultString}</span>
	</div>
{/if}

<style>
	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
		width: 100%;
	}

	li.autocomplete-items:hover {
		background-color: #228bec;
	}

	li.autocomplete-items.selected {
		background-color: #1a63a8;
	}

	#autocomplete-items-list {
		position: absolute;
		margin: 0;
		padding: 0;
		width: 100%;
		border: 1px solid #ddd;
		background-color: #ddd;
	}

	div.autocomplete {
		position: relative;
		display: inline-block;
		width: inherit;
	}
	.stack {
		margin-top: 2rem;
	}
	#autocomplete-form {
		position: relative;
		display: block;
		width: 50rem;
	}

	input#city-select {
		width: inherit;
	}
</style>
